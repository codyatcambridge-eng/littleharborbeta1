'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase';
import { Post, ForumCategory } from '@/lib/types';
import Link from 'next/link';
import { Icon } from '@/components/Icon';

const CATEGORIES: ForumCategory[] = [
  { id: '1', name: 'General Support', slug: 'general', description: 'Talk about life with your child', icon: 'heart' },
  { id: '2', name: 'Daily Life & School', slug: 'daily-life', description: 'School, therapy, daily routines', icon: 'calendar' },
  { id: '3', name: 'Health & Medical', slug: 'health', description: 'Health questions and experiences', icon: 'activity' },
  { id: '4', name: 'Parenting Tips', slug: 'tips', description: 'Share what works for your family', icon: 'lightbulb' },
];

export default function CommunityPage() {
  const searchParams = useSearchParams();
  const selectedState = searchParams.get('state') || 'all';
  const selectedCategory = searchParams.get('category') || '';

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const { data: { user } } = await supabaseClient.auth.getUser();
        setCurrentUser(user);

        // Fetch posts
        const params = new URLSearchParams();
        if (selectedCategory) params.append('categoryId', selectedCategory);
        if (selectedState && selectedState !== 'all') params.append('stateCode', selectedState);
        params.append('limit', '20');

        const response = await fetch(`/api/posts?${params}`);
        const data = await response.json();

        if (response.ok) {
          setPosts(data.posts || []);
        } else {
          setError(data.error || 'Failed to load posts');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, [selectedState, selectedCategory]);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !newPostTitle || !newPostBody) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newPostTitle,
          body: newPostBody,
          categoryId: selectedCategory || '1',
          stateCode: selectedState === 'all' ? '' : selectedState,
          userId: currentUser.id,
          userEmail: currentUser.email,
          displayName: currentUser.user_metadata?.display_name || 'Parent',
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setNewPostTitle('');
        setNewPostBody('');
        setShowNewPostForm(false);
        // Refetch posts
        router.refresh();
      } else {
        setError(result.error || 'Failed to create post');
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
        <p className="text-mist-600">Loading the forum...</p>
      </div>
    );
  }

  return (
    <div className="section py-14">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-harbor-900 mb-2">Parent Forum</h1>
        <p className="text-mist-600">Connect, support, and learn from parents on the same journey</p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/community"
          className={`px-4 py-2 rounded-lg font-medium ${
            selectedCategory === '' ? 'bg-harbor-500 text-white' : 'bg-mist-100 text-mist-700 hover:bg-mist-200'
          }`}
        >
          All Topics
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/community?category=${cat.id}`}
            className={`px-4 py-2 rounded-lg font-medium ${
              selectedCategory === cat.id ? 'bg-harbor-500 text-white' : 'bg-mist-100 text-mist-700 hover:bg-mist-200'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* New Post Button */}
      {currentUser && (
        <div className="mb-8">
          <button
            onClick={() => setShowNewPostForm(!showNewPostForm)}
            className="btn-primary flex items-center gap-2"
          >
            <Icon name="plus" size={18} /> Start a conversation
          </button>
        </div>
      )}

      {/* New Post Form */}
      {showNewPostForm && currentUser && (
        <form onSubmit={handleCreatePost} className="card p-6 mb-8 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-harbor-900 mb-2">Topic</label>
            <input
              type="text"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="What's on your mind?"
              required
              className="w-full px-4 py-2 border border-mist-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harbor-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-harbor-900 mb-2">Your message</label>
            <textarea
              value={newPostBody}
              onChange={(e) => setNewPostBody(e.target.value)}
              placeholder="Share your experience or question..."
              rows={4}
              required
              className="w-full px-4 py-2 border border-mist-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harbor-500"
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-50">
              {submitting ? 'Posting...' : 'Post'}
            </button>
            <button type="button" onClick={() => setShowNewPostForm(false)} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Posts */}
      {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-6">{error}</div>}

      {posts.length === 0 ? (
        <div className="card p-12 text-center">
          <Icon name="message-circle" size={40} className="mx-auto text-mist-300 mb-4" />
          <p className="text-mist-600">No posts yet. Be the first to start a conversation!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/community/${post.id}`}
              className="card p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-harbor-900 flex-1">{post.title}</h3>
                {post.flagged_status && post.flagged_status !== 'clean' && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded font-medium">
                    Under review
                  </span>
                )}
              </div>
              <p className="text-mist-700 mb-3">{post.snippet}</p>
              <div className="flex items-center gap-4 text-sm text-mist-600">
                <span className="flex items-center gap-1">
                  <Icon name="message-square" size={14} /> {post.reply_count} replies
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="heart" size={14} /> {post.support_count} supports
                </span>
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
