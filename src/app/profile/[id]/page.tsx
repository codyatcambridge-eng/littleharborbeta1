'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase';
import { Profile } from '@/lib/types';
import Link from 'next/link';
import { Icon } from '@/components/Icon';

export default function ProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabaseClient.auth.getUser();
        setCurrentUserId(user?.id || null);

        const { data, error } = await supabaseClient
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (err) {
        console.error(err);
        router.push('/community');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  if (loading) {
    return (
      <div className="section py-20 text-center">
        <p className="text-mist-600">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="section py-20 text-center">
        <p className="text-mist-600 mb-4">Profile not found</p>
        <Link href="/community" className="btn-secondary">Back to forum</Link>
      </div>
    );
  }

  const isOwnProfile = currentUserId === profile.user_id;

  return (
    <div className="section py-14">
      <div className="max-w-2xl mx-auto">
        <Link href="/community" className="text-harbor-600 hover:underline flex items-center gap-1 mb-6">
          <Icon name="arrow-left" size={16} /> Back to forum
        </Link>

        <div className="card p-8">
          {/* Profile Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 rounded-full bg-harbor-100 flex items-center justify-center">
                  <Icon name="user" size={32} className="text-harbor-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-harbor-900">{profile.display_name}</h1>
                  <p className="text-sm text-mist-600">
                    {profile.state_code && `📍 ${profile.state_code}`}
                  </p>
                </div>
              </div>

              {profile.verified_parent_status === 'verified' && (
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit">
                  <Icon name="check" size={14} /> Verified Parent
                </div>
              )}
            </div>

            {isOwnProfile && (
              <Link href="/profile/edit" className="btn-secondary">
                Edit Profile
              </Link>
            )}
          </div>

          {/* Bio */}
          {profile.bio && (
            <div className="mb-6 pb-6 border-b border-mist-200">
              <h3 className="text-sm font-semibold text-mist-600 mb-2">About</h3>
              <p className="text-mist-700">{profile.bio}</p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-harbor-50 rounded-lg">
              <p className="text-sm text-mist-600">Posts</p>
              <p className="text-2xl font-bold text-harbor-900">{profile.posts_count}</p>
            </div>
            <div className="p-4 bg-sand-50 rounded-lg">
              <p className="text-sm text-mist-600">Joined</p>
              <p className="text-sm text-mist-700">{new Date(profile.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          {!isOwnProfile && (
            <button className="w-full btn-primary">
              <Icon name="mail" size={16} /> Send Message
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
