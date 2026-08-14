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

    const { reply, status } = await request.json();

    if (!reply && !status) {
      return NextResponse.json({ error: 'Reply or status is required.' }, { status: 400 });
    }

    let result: any[];
    if (reply && status) {
      result = (await getDb()`
        update public.contact_messages set reply = ${reply}, status = ${status || 'replied'}, replied_at = now() where id = ${id} returning *
      `) as any[];
    } else if (reply) {
      result = (await getDb()`
        update public.contact_messages set reply = ${reply}, status = 'replied', replied_at = now() where id = ${id} returning *
      `) as any[];
    } else {
      result = (await getDb()`
        update public.contact_messages set status = ${status}, replied_at = now() where id = ${id} returning *
      `) as any[];
    }

    return NextResponse.json({ data: result[0] });
  } catch (err: any) {
    console.error('Update contact error:', err);
    return NextResponse.json({ error: err.message || 'Failed to update contact message.' }, { status: 500 });
  }
}
