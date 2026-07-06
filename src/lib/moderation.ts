/**
 * Content moderation utilities for Little Harbor.
 * Scans posts, messages, and comments for unsafe content.
 * Non-blocking: flags for review but allows posting (per your spec).
 */

import { sendModerationAlert, sendSafetyNudgeEmail } from './email';

// Patterns for detecting potentially unsafe content
const UNSAFE_PATTERNS = {
  phone: /\b(\d{3}[-.]?\d{3}[-.]?\d{4}|\(\d{3}\)\s?\d{3}[-.]?\d{4})\b/g,
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  url: /(https?:\/\/[^\s]+|www\.[^\s]+)/g,
  address: /(\d+\s+[A-Z][a-z]+\s+(Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Lane|Ln|Boulevard|Blvd|Court|Ct|Circle|Cir|Way|Place|Pl|Parkway|Pkwy))/gi,
  socialHandle: /@[A-Za-z0-9_]{1,15}\b/g, // Twitter/X style handles
};

export interface FlaggedContent {
  flagged: boolean;
  flags: string[];
  severity: 'low' | 'medium' | 'high';
  snippet: string;
}

/**
 * Scan content for unsafe patterns.
 * Returns details about what was flagged.
 */
export function scanContent(content: string, contentType: 'post' | 'message' | 'comment' = 'post'): FlaggedContent {
  const flags: string[] = [];
  let severity: 'low' | 'medium' | 'high' = 'low';

  // Check for phone numbers
  if (UNSAFE_PATTERNS.phone.test(content)) {
    flags.push('phone_number');
    severity = 'high';
  }

  // Check for email addresses
  if (UNSAFE_PATTERNS.email.test(content)) {
    flags.push('email_address');
    severity = 'high';
  }

  // Check for URLs (suspicious in some contexts)
  if (UNSAFE_PATTERNS.url.test(content)) {
    flags.push('external_url');
    if (severity !== 'high') severity = 'medium';
  }

  // Check for physical addresses
  if (UNSAFE_PATTERNS.address.test(content)) {
    flags.push('physical_address');
    severity = 'high';
  }

  // Check for social media handles
  if (UNSAFE_PATTERNS.socialHandle.test(content)) {
    flags.push('social_media_handle');
    if (severity !== 'high') severity = 'medium';
  }

  return {
    flagged: flags.length > 0,
    flags,
    severity,
    snippet: content.substring(0, 200),
  };
}

/**
 * Log a moderation action to the database.
 */
export async function logModerationAction(
  supabase: any,
  targetType: 'post' | 'comment' | 'message' | 'profile',
  targetId: string,
  action: 'hide' | 'remove' | 'warn' | 'verify' | 'dismiss',
  note: string,
  moderatorId?: string
) {
  try {
    const { data, error } = await supabase
      .from('moderation_actions')
      .insert([
        {
          moderator_id: moderatorId || 'system',
          target_type: targetType,
          target_id: targetId,
          action,
          note,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;
    console.log('Moderation action logged:', data);
    return data;
  } catch (error) {
    console.error('Failed to log moderation action:', error);
    throw error;
  }
}

/**
 * Flag content for review and notify mods.
 */
export async function flagContentForReview(
  supabase: any,
  targetType: 'post' | 'comment' | 'message' | 'profile',
  targetId: string,
  reason: string,
  reporterId: string,
  contentSnippet: string
) {
  try {
    // Create report record
    const { data, error } = await supabase
      .from('reports')
      .insert([
        {
          reporter_id: reporterId,
          target_type: targetType,
          target_id: targetId,
          reason,
          created_at: new Date().toISOString(),
          status: 'open',
        },
      ])
      .select();

    if (error) throw error;

    // Send email alert to mods
    await sendModerationAlert(reason, targetType, targetId, contentSnippet);

    console.log('Content flagged for review:', data);
    return data;
  } catch (error) {
    console.error('Failed to flag content:', error);
    throw error;
  }
}
