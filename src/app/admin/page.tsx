'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase';
import { Icon } from '@/components/Icon';
import Link from 'next/link';

interface Report {
  id: string;
  reporter_id: string;
  target_type: string;
  target_id: string;
  reason: string;
  created_at: string;
  status: 'open' | 'reviewing' | 'resolved';
  profiles?: { display_name: string };
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [actionNotes, setActionNotes] = useState('');
  const [selectedAction, setSelectedAction] = useState<'hide' | 'remove' | 'warn' | 'dismiss'>('dismiss');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdminAndFetchReports = async () => {
      try {
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (!user) {
          router.push('/auth');
          return;
        }

        // Check if user is admin
        const { data: profile } = await supabaseClient
          .from('profiles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (profile?.role !== 'admin' && profile?.role !== 'moderator') {
          setError('Access denied. Moderators only.');
          setLoading(false);
          return;
        }

        setUser(user);
        setIsAdmin(true);

        // Fetch reports
        const response = await fetch('/api/moderation/reports?status=open&limit=50');
        const data = await response.json();
        if (response.ok) {
          setReports(data.reports || []);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkAdminAndFetchReports();
  }, [router]);

  const handleTakeAction = async () => {
    if (!selectedReport) return;

    setSubmitting(true);
    try {
      // Log moderation action
      const actionResponse = await fetch('/api/moderation/actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moderatorId: user.id,
          targetType: selectedReport.target_type,
          targetId: selectedReport.target_id,
          action: selectedAction,
          note: actionNotes,
        }),
      });

      if (!actionResponse.ok) throw new Error('Failed to log action');

      // Update report status
      const reportResponse = await fetch('/api/moderation/reports', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedReport.id,
          status: 'resolved',
        }),
      });

      if (reportResponse.ok) {
        // Remove from list
        setReports(reports.filter(r => r.id !== selectedReport.id));
        setSelectedReport(null);
        setActionNotes('');
        setSelectedAction('dismiss');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="section py-20 text-center">
        <p className="text-mist-600">Loading admin dashboard...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="section py-20 text-center">
        <p className="text-red-600 mb-4">{error || 'Access denied'}</p>
        <Link href="/community" className="btn-secondary">Back to forum</Link>
      </div>
    );
  }

  return (
    <div className="section py-14">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-harbor-900 mb-2">Moderation Dashboard</h1>
        <p className="text-mist-600">Review and manage flagged content</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-6">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-harbor-900">Open Reports</h2>
              <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full">
                {reports.length}
              </span>
            </div>

            {reports.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="check-circle" size={40} className="mx-auto text-green-500 mb-3" />
                <p className="text-mist-600">No open reports. Great work!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {reports.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedReport?.id === report.id
                        ? 'border-harbor-500 bg-harbor-50'
                        : 'border-mist-200 bg-white hover:border-mist-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold text-harbor-900">{report.target_type.toUpperCase()}</div>
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                        {report.status}
                      </span>
                    </div>
                    <p className="text-sm text-mist-700 mb-1">{report.reason}</p>
                    <p className="text-xs text-mist-500">
                      Reported by {report.profiles?.display_name || 'Anonymous'} • {new Date(report.created_at).toLocaleDateString()}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Panel */}
        {selectedReport ? (
          <div className="card p-6 h-fit">
            <h3 className="text-lg font-semibold text-harbor-900 mb-4">Take Action</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-harbor-900 mb-2">Action</label>
                <select
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value as any)}
                  className="w-full px-3 py-2 border border-mist-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harbor-500"
                >
                  <option value="dismiss">Dismiss</option>
                  <option value="warn">Send Warning</option>
                  <option value="hide">Hide Content</option>
                  <option value="remove">Remove Content</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-harbor-900 mb-2">Notes</label>
                <textarea
                  value={actionNotes}
                  onChange={(e) => setActionNotes(e.target.value)}
                  placeholder="Document your decision..."
                  rows={4}
                  className="w-full px-3 py-2 border border-mist-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harbor-500"
                />
              </div>

              <button
                onClick={handleTakeAction}
                disabled={submitting}
                className="w-full btn-primary disabled:opacity-50"
              >
                {submitting ? 'Processing...' : 'Take Action'}
              </button>
            </div>
          </div>
        ) : (
          <div className="card p-6 h-fit">
            <p className="text-mist-600 text-center">Select a report to take action</p>
          </div>
        )}
      </div>
    </div>
  );
}
