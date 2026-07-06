'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase';
import { Profile } from '@/lib/types';
import { Icon } from '@/components/Icon';

export default function ProfileEditPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (!user) {
          router.push('/auth');
          return;
        }

        const { data, error: fetchError } = await supabaseClient
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (fetchError) throw fetchError;
        if (data) {
          setProfile(data);
          setDisplayName(data.display_name);
          setBio(data.bio || '');
          setStateCode(data.state_code || '');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    setError(null);

    try {
      const { error: updateError } = await supabaseClient
        .from('profiles')
        .update({
          display_name: displayName,
          bio: bio,
          state_code: stateCode,
        })
        .eq('id', profile.id);

      if (updateError) throw updateError;

      router.push(`/profile/${profile.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="section py-20 text-center">
        <p className="text-mist-600">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="section py-14">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-harbor-900">Edit Your Profile</h1>
          <button
            onClick={handleSignOut}
            className="btn-secondary flex items-center gap-2"
          >
            <Icon name="log-out" size={16} /> Sign Out
          </button>
        </div>

        <form onSubmit={handleSave} className="card p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-harbor-900 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2 border border-mist-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harbor-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-harbor-900 mb-2">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us a bit about yourself (optional)"
              rows={4}
              className="w-full px-4 py-2 border border-mist-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harbor-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-harbor-900 mb-2">
              State
            </label>
            <input
              type="text"
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value.toUpperCase())}
              placeholder="e.g., GA, CA, NY"
              maxLength={2}
              className="w-full px-4 py-2 border border-mist-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harbor-500"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
