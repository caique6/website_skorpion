import { NextResponse } from 'next/server';
import { getAuthUrl } from '@/lib/google/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const url = getAuthUrl();
    return NextResponse.redirect(url);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}