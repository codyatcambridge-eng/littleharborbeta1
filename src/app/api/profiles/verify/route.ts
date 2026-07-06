/**
 * POST /api/profiles/verify
 * Verify a parent's identity (admin only).
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profileId, status } = body;

    if (!profileId || !status) {
      return NextResponse.json(
        { error: 'Missing profileId or status' },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();

    // Update verification status
    const { data, error } = await supabase
      .from('profiles')
      .update({ verified_parent_status: status })
      .eq('id', profileId)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { profile: data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to verify profile' },
      { status: 500 }
    );
  }
}
