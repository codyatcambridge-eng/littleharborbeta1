/**
 * POST /api/conversations
 * Create or get a private conversation between two parents.
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { participant1Id, participant2Id } = body;

    if (!participant1Id || !participant2Id) {
      return NextResponse.json(
        { error: 'Both participant IDs required' },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();

    // Check if conversation already exists
    const { data: existingConversation } = await supabase
      .from('private_conversations')
      .select('*')
      .eq('participant_ids', [participant1Id, participant2Id].sort())
      .single();

    if (existingConversation) {
      return NextResponse.json(existingConversation, { status: 200 });
    }

    // Create new conversation
    const { data: conversation, error } = await supabase
      .from('private_conversations')
      .insert([
        {
          participant_ids: [participant1Id, participant2Id].sort(),
          last_message_at: new Date().toISOString(),
          last_snippet: '',
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

    return NextResponse.json(conversation, { status: 201 });
  } catch (error: any) {
    console.error('Conversation creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create conversation' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/conversations?userId=...
 * Fetch all conversations for a user.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId required' },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();

    // Find conversations where userId is a participant
    const { data: conversations, error } = await supabase
      .from('private_conversations')
      .select(
        `
        *,
        participants:participant_ids(id, display_name, avatar_url)
        `
      )
      .order('last_message_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Filter conversations that include this user
    const userConversations = conversations?.filter((conv: any) =>
      conv.participant_ids?.includes(userId)
    ) || [];

    return NextResponse.json(
      {
        conversations: userConversations,
        total: userConversations.length,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Conversations fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch conversations' },
      { status: 500 }
    );
  }
}
