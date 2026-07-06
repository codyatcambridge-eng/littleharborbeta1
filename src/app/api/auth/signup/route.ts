/**
 * POST /api/auth/signup
 * Creates a user, profile, and sends verification email.
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, displayName } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();

    // Sign up user
    const { data: authData, error: signUpError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
    });

    if (signUpError) {
      return NextResponse.json(
        { error: signUpError.message },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'User creation failed' },
        { status: 500 }
      );
    }

    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
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

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message },
        { status: 500 }
      );
    }

    // Send verification email
    try {
      await sendVerificationEmail(email, displayName || email.split('@')[0]);
    } catch (emailError) {
      console.error('Email send failed:', emailError);
      // Don't fail the signup if email fails, but log it
    }

    return NextResponse.json(
      {
        message: 'Account created successfully. Check your email for verification.',
        user: authData.user,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error.message || 'Signup failed' },
      { status: 500 }
    );
  }
}
