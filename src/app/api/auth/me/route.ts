import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/server';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('session')?.value;
    if (!token) {
      return NextResponse.json({ user: null });
    }

    const payload = verifyToken(token);
    const result = (await getDb()`
      select id, email, full_name, phone, role from public.users where id = ${payload.userId}
    `) as any[];
    const user = result[0] || null;

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}
