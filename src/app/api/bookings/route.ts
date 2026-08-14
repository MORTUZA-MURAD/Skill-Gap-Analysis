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
    const result = await getDb()`
      select * from public.demo_bookings where user_id = ${payload.userId} order by created_at desc
    `;

    return NextResponse.json({ data: result });
  } catch (err: any) {
    console.error('Fetch bookings error:', err);
    return NextResponse.json({ error: err.message || 'Failed to fetch bookings.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentName, phone, email, course, preferredDate, preferredTime } = body;

    if (!studentName || !phone || !course || !preferredDate || !preferredTime) {
      return NextResponse.json({ error: 'All required fields must be filled.' }, { status: 400 });
    }

    const token = request.cookies.get('session')?.value;
    let userId: string | null = null;
    if (token) {
      try {
        const payload = verifyToken(token);
        userId = payload.userId;
      } catch {
        // guest booking
      }
    }

    const result = (await getDb()`
      insert into public.demo_bookings (student_name, phone, email, course, preferred_date, preferred_time, user_id)
      values (${studentName}, ${phone}, ${email || 'student@example.com'}, ${course}, ${preferredDate}, ${preferredTime}, ${userId})
      returning *
    `) as any[];

    return NextResponse.json({ data: result[0] }, { status: 201 });
  } catch (err: any) {
    console.error('Create booking error:', err);
    return NextResponse.json({ error: err.message || 'Failed to create booking.' }, { status: 500 });
  }
}
