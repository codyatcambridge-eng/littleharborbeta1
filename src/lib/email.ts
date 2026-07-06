/**
 * Email service for Little Harbor using Resend.
 * Handles verification emails, notifications, and mod alerts.
 */

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.NEXT_PUBLIC_APP_EMAIL || 'noreply@littleharbor.app';

/**
 * Send a verification email to a new parent.
 */
export async function sendVerificationEmail(email: string, displayName: string) {
  try {
    const response = await resend.emails.send({
      from: `Little Harbor <${fromEmail}>`,
      to: email,
      subject: 'Welcome to Little Harbor 🪷',
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2c7a7b; margin-bottom: 20px;">Welcome to Little Harbor, ${displayName}!</h1>
            <p>You're now part of a warm, trustworthy community of parents navigating similar journeys.</p>
            <p>Your account has been created. You can now:</p>
            <ul style="color: #555;">
              <li>Join the parent forum and read conversations</li>
              <li>Complete your profile to connect with others</li>
              <li>Send and receive private messages</li>
              <li>Filter by state to find parents near you</li>
            </ul>
            <p><strong>Safety reminder:</strong> Never share personal details like your address, phone number, or child's full name in public posts. Always use private messages carefully and after building trust.</p>
            <p style="margin-top: 30px;">
              <a href="https://littleharborbeta1.vercel.app/community" style="background-color: #2c7a7b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
                Go to the Forum
              </a>
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="font-size: 12px; color: #999;">
              Little Harbor — A calm haven for parents. Not medical advice. Always consult healthcare providers.
            </p>
          </div>
        </div>
      `,
    });

    console.log('Verification email sent:', response.id);
    return response;
  } catch (error) {
    console.error('Failed to send verification email:', error);
    throw error;
  }
}

/**
 * Send a moderation alert to admins when content is flagged.
 */
export async function sendModerationAlert(
  flagReason: string,
  contentType: string,
  contentId: string,
  contentSnippet: string
) {
  try {
    const response = await resend.emails.send({
      from: `Little Harbor Moderation <${fromEmail}>`,
      to: process.env.NEXT_PUBLIC_APP_EMAIL || 'admin@littleharbor.app',
      subject: `[MODERATION] ${contentType.toUpperCase()} flagged`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #d97706;">⚠️ Content Flagged for Review</h2>
            <p><strong>Content Type:</strong> ${contentType}</p>
            <p><strong>Reason:</strong> ${flagReason}</p>
            <p><strong>Content ID:</strong> ${contentId}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p><strong>Snippet:</strong></p>
            <blockquote style="background: #f3f4f6; padding: 10px; border-left: 4px solid #d97706;">
              ${contentSnippet}
            </blockquote>
            <p style="margin-top: 20px;">
              <a href="https://littleharborbeta1.vercel.app/admin" style="background-color: #d97706; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Review in Admin Dashboard
              </a>
            </p>
          </div>
        </div>
      `,
    });

    console.log('Moderation alert sent:', response.id);
    return response;
  } catch (error) {
    console.error('Failed to send moderation alert:', error);
    throw error;
  }
}

/**
 * Send a gentle nudge email when a parent uses unsafe language.
 */
export async function sendSafetyNudgeEmail(email: string, displayName: string, issue: string) {
  try {
    const response = await resend.emails.send({
      from: `Little Harbor <${fromEmail}>`,
      to: email,
      subject: 'A gentle reminder about keeping Little Harbor safe',
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2c7a7b;">Hi ${displayName},</h2>
            <p>We noticed your recent post or message contained <strong>${issue}</strong>.</p>
            <p>At Little Harbor, we protect everyone's privacy first. This includes:</p>
            <ul style="color: #555;">
              <li>❌ Phone numbers</li>
              <li>❌ Email addresses</li>
              <li>❌ Full names of children</li>
              <li>❌ Physical addresses or specific locations</li>
              <li>❌ Social media handles or usernames</li>
            </ul>
            <p><strong>Safe alternatives:</strong></p>
            <ul style="color: #555;">
              <li>✅ Use private messages after building trust</li>
              <li>✅ Share general locations (state/region only)</li>
              <li>✅ Use child's first name or a nickname</li>
              <li>✅ Talk through your experience without personal identifiers</li>
            </ul>
            <p style="margin-top: 30px; padding: 15px; background: #f0fdf4; border-left: 4px solid #16a34a; color: #166534;">
              <strong>Thank you for helping keep Little Harbor a safe, trustworthy place for all parents.</strong>
            </p>
          </div>
        </div>
      `,
    });

    console.log('Safety nudge email sent:', response.id);
    return response;
  } catch (error) {
    console.error('Failed to send safety nudge email:', error);
    throw error;
  }
}
