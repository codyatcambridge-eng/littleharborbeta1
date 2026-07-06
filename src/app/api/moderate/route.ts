/**
 * POST /api/moderate
 * Scans content for unsafe patterns and flags for review.
 * Non-blocking: content is posted, but flagged items are logged and mods are notified.
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import { scanContent, flagContentForReview } from '@/lib/moderation';
import { sendSafetyNudgeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, contentType, userId, userEmail, displayName } = body;

    if (!content || !contentType || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Scan content
    const scanResult = scanContent(content, contentType);

    // If flagged, log and notify
    if (scanResult.flagged) {
      const supabase = supabaseServer();

      // Log the flag
      await flagContentForReview(
        supabase,
        contentType,
        userId, // Using userId as contentId for simplicity; adjust as needed
        `Flagged for: ${scanResult.flags.join(', ')}`,
        userId,
        scanResult.snippet
      );

      // Send safety nudge email
      if (userEmail && displayName) {
        const flagNames = scanResult.flags
          .map(f => f.replace(/_/g, ' '))
          .join(', ');
        await sendSafetyNudgeEmail(userEmail, displayName, flagNames);
      }

      // Return flag info (but allow posting)
      return NextResponse.json(
        {
          flagged: true,
          flags: scanResult.flags,
          severity: scanResult.severity,
          message: `Your ${contentType} was posted, but we detected potentially unsafe content (${scanResult.flags.join(', ')}). Our team has been notified. See our safety guide for best practices.`,
        },
        { status: 200 }
      );
    }

    // If clean, return success
    return NextResponse.json(
      {
        flagged: false,
        message: `Your ${contentType} was posted safely.`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Moderation error:', error);
    return NextResponse.json(
      { error: error.message || 'Moderation scan failed' },
      { status: 500 }
    );
  }
}
