'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase';
import Link from 'next/link';
import { Icon } from '@/components/Icon';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign up
        const { data: authData, error: signUpError } = await supabaseClient.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;
        if (!authData.user) throw new Error('Sign up failed');

        // Create profile
        const { error: profileError } = await supabaseClient.from('profiles').insert([
          {
            user_id: authData.user.id,
            display_name: displayName || email.split('@')[0],
            avatar_url: null,
            bio: '',
            state_code: '',
            role: 'parent',
            verified_parent_status: 'unverified',
            posts_count: 0,
            created_at: new Date().toISOString(),
          },
        ]);

        if (profileError) throw profileError;

        setError(null);
        router.push('/community');
      } else {
        // Sign in
        const { error: signInError } = await supabaseClient.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        router.push('/community');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-harbor-50 to-sand-50 p-4">
      <div className="w-full max-w-md">
        <div className="card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <Icon name="lighthouse" size={40} className="text-harbor-600" />
            </Link>
            <h1 className="text-2xl font-bold text-harbor-900 mb-2">
              {isSignUp ? 'Join Little Harbor' : 'Welcome Back'}
            </h1>
            <p className="text-sm text-mist-600">
              {isSignUp
                ? 'Create your parent account to join the community'
                : 'Sign in to your parent account'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-harbor-900 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-mist-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harbor-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-harbor-900 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 border border-mist-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harbor-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-harbor-900 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border border-mist-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harbor-500"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center text-sm text-mist-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="ml-1 text-harbor-600 font-semibold hover:underline"
            >
              {isSignUp ? 'Sign in' : 'Join now'}
            </button>
          </div>

          {/* Back to home */}
          <div className="mt-6 pt-6 border-t border-mist-200 text-center">
            <Link href="/" className="text-sm text-harbor-600 hover:underline">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
