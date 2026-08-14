import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const result = (await getDb()`
      insert into public.contact_messages (name, email, phone, message)
      values (${name}, ${email}, ${phone}, ${message})
      returning *
    `) as any[];

    return NextResponse.json({ data: result[0] }, { status: 201 });
  } catch (err: any) {
    console.error('Contact error:', err);
    return NextResponse.json({ error: err.message || 'Failed to send message.' }, { status: 500 });
  }
}
