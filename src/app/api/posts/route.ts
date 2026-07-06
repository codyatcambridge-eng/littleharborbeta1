/**
 * POST /api/posts
 * Create a new forum post with moderation scanning.
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import { scanContent, flagContentForReview } from '@/lib/moderation';
import { sendSafetyNudgeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, body: content, categoryId, stateCode, userId, userEmail, displayName } = body;

    if (!title || !content || !categoryId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();

    // Scan content
    const scanResult = scanContent(content, 'post');

    // Create post
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert([
        {
          author_id: userId,
          category_id: categoryId,
          state_code: stateCode || 'all',
          title,
          body: content,
          snippet: content.substring(0, 200),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          visibility_status: 'visible',
          reply_count: 0,
          support_count: 0,
          flagged_status: scanResult.flagged ? 'auto_flagged' : 'clean',
        },
      ])
      .select()
      .single();

    if (postError) {
      return NextResponse.json(
        { error: postError.message },
        { status: 500 }
      );
    }

    // If flagged, notify mods and send nudge
    if (scanResult.flagged) {
      try {
        await flagContentForReview(
          supabase,
          'post',
          post.id,
          `Auto-flagged: ${scanResult.flags.join(', ')}`,
          userId,
          scanResult.snippet
        );

        if (userEmail && displayName) {
          const flagNames = scanResult.flags
            .map(f => f.replace(/_/g, ' '))
            .join(', ');
          await sendSafetyNudgeEmail(userEmail, displayName, flagNames);
        }
      } catch (flagError) {
        console.error('Flag error:', flagError);
      }
    }

    return NextResponse.json(
      {
        post,
        flagged: scanResult.flagged,
        flags: scanResult.flags,
        message: scanResult.flagged
          ? 'Post created, but flagged for review. See our safety guide.'
          : 'Post created successfully.',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Post creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create post' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/posts?categoryId=...&stateCode=...&limit=20&offset=0
 * Fetch forum posts with optional filtering.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const stateCode = searchParams.get('stateCode');
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const supabase = supabaseServer();

    let query = supabase
      .from('posts')
      .select(
        `
        *,
        profiles:author_id(id, display_name, avatar_url, verified_parent_status)
        `,
        { count: 'exact' }
      )
      .eq('visibility_status', 'visible')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    if (stateCode && stateCode !== 'all') {
      query = query.or(`state_code.eq.${stateCode},state_code.eq.all`);
    }

    const { data: posts, error, count } = await query;

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        posts,
        total: count,
        limit,
        offset,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Posts fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
