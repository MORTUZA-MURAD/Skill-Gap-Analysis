import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/server';
import { hashPassword } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, phone, password } = await request.json();

    if (!fullName || !email || !phone || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const existing = (await getDb()`select id from public.users where email = ${email}`) as any[];
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Email already registered.' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const role = email.toLowerCase().includes('admin') ? 'admin' : 'student';

    const result = (await getDb()`
      insert into public.users (email, password_hash, full_name, phone, role)
      values (${email}, ${passwordHash}, ${fullName}, ${phone}, ${role})
      returning id, email, full_name, phone, role
    `) as any[];

    const user = result[0];
    const token = process.env.SESSION_SECRET
      ? require('@/lib/auth').signToken({ userId: user.id, email: user.email, role: user.role })
      : null;

    if (token) {
      const cookieStore = await cookies();
      cookieStore.set('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
    }

    return NextResponse.json({ user }, { status: 201 });
  } catch (err: any) {
    console.error('Register error:', err);
    return NextResponse.json({ error: err.message || 'Registration failed.' }, { status: 500 });
  }
}
