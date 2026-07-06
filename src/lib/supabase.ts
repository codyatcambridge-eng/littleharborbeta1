/**
 * Supabase client utilities for Little Harbor.
 * Provides both client-side and server-side Supabase instances.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

/**
 * Client-side Supabase instance.
 * Use this in React components and client-side code.
 */
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Server-side Supabase instance with service role.
 * Use this in API routes and server actions for privileged operations.
 */
export const supabaseServer = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
  }
  return createClient(supabaseUrl, serviceRoleKey);
};

/**
 * Helper to get current user session (client-side).
 */
export const getCurrentUser = async () => {
  const { data: { session } } = await supabaseClient.auth.getSession();
  return session?.user || null;
};

/**
 * Helper to get current user's profile.
 */
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) console.error('Error fetching profile:', error);
  return data || null;
};
