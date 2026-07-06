/**
 * POST /api/moderation/actions
 * Log a moderation action (hide, remove, warn, verify, dismiss).
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { moderatorId, targetType, targetId, action, note } = body;

    if (!moderatorId || !targetType || !targetId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();

    // Log the action
    const { data: moderationAction, error } = await supabase
      .from('moderation_actions')
      .insert([
        {
          moderator_id: moderatorId,
          target_type: targetType,
          target_id: targetId,
          action,
          note: note || '',
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // If hiding/removing post, update visibility
    if (targetType === 'post' && (action === 'hide' || action === 'remove')) {
      await supabase
        .from('posts')
        .update({ visibility_status: action === 'hide' ? 'hidden' : 'removed' })
        .eq('id', targetId);
    }

    // If verifying user, update their status
    if (targetType === 'profile' && action === 'verify') {
      await supabase
        .from('profiles')
        .update({ verified_parent_status: 'verified' })
        .eq('id', targetId);
    }

    return NextResponse.json(
      { action: moderationAction },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Moderation action error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to log action' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/moderation/actions?limit=50&offset=0
 * Fetch moderation action history.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const supabase = supabaseServer();

    const { data: actions, error, count } = await supabase
      .from('moderation_actions')
      .select(
        `
        *,
        profiles:moderator_id(id, display_name)
        `,
        { count: 'exact' }
      )
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        actions,
        total: count,
        limit,
        offset,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Fetch actions error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch actions' },
      { status: 500 }
    );
  }
}
