import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/server';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('session')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (payload.role !== 'admin' && !payload.email.toLowerCase().includes('admin')) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }

    const result = await getDb()`
      select * from public.contact_messages order by created_at desc
    `;

    return NextResponse.json({ data: result });
  } catch (err: any) {
    console.error('Admin fetch contacts error:', err);
    return NextResponse.json({ error: err.message || 'Failed to fetch contact messages.' }, { status: 500 });
  }
}
