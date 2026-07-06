/**
 * POST /api/messages
 * Create a private message with moderation scanning.
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import { scanContent, flagContentForReview } from '@/lib/moderation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { conversationId, senderId, content } = body;

    if (!conversationId || !senderId || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();

    // Scan content
    const scanResult = scanContent(content, 'message');

    // Create message
    const { data: message, error: messageError } = await supabase
      .from('private_messages')
      .insert([
        {
          conversation_id: conversationId,
          sender_id: senderId,
          content,
          created_at: new Date().toISOString(),
          flagged_status: scanResult.flagged ? 'auto_flagged' : 'clean',
        },
      ])
      .select()
      .single();

    if (messageError) {
      return NextResponse.json(
        { error: messageError.message },
        { status: 500 }
      );
    }

    // If flagged, notify mods
    if (scanResult.flagged) {
      try {
        await flagContentForReview(
          supabase,
          'message',
          message.id,
          `Auto-flagged: ${scanResult.flags.join(', ')}`,
          senderId,
          content.substring(0, 200)
        );
      } catch (flagError) {
        console.error('Flag error:', flagError);
      }
    }

    // Update conversation last_message_at
    await supabase
      .from('private_conversations')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', conversationId);

    return NextResponse.json(
      {
        message,
        flagged: scanResult.flagged,
        flags: scanResult.flags,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Message creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send message' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/messages?conversationId=...&limit=50&offset=0
 * Fetch messages in a conversation.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    if (!conversationId) {
      return NextResponse.json(
        { error: 'conversationId required' },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();

    const { data: messages, error, count } = await supabase
      .from('private_messages')
      .select(
        `
        *,
        profiles:sender_id(id, display_name, avatar_url)
        `,
        { count: 'exact' }
      )
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        messages,
        total: count,
        limit,
        offset,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Messages fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
