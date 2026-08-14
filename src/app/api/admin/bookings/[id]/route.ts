import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/server';
import { verifyToken } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.cookies.get('session')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (payload.role !== 'admin' && !payload.email.toLowerCase().includes('admin')) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }

    const { status, admin_notes } = await request.json();

    if (!status && admin_notes === undefined) {
      return NextResponse.json({ error: 'No fields to update.' }, { status: 400 });
    }

    let result: any[];
    if (status && admin_notes !== undefined) {
      result = (await getDb()`
        update public.demo_bookings set status = ${status}, admin_notes = ${admin_notes}, replied_at = now() where id = ${id} returning *
      `) as any[];
    } else if (status) {
      result = (await getDb()`
        update public.demo_bookings set status = ${status}, replied_at = now() where id = ${id} returning *
      `) as any[];
    } else {
      result = (await getDb()`
        update public.demo_bookings set admin_notes = ${admin_notes}, replied_at = now() where id = ${id} returning *
      `) as any[];
    }

    return NextResponse.json({ data: result[0] });
  } catch (err: any) {
    console.error('Update booking error:', err);
    return NextResponse.json({ error: err.message || 'Failed to update booking.' }, { status: 500 });
  }
}
