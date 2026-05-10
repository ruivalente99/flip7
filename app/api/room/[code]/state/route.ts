import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/client';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const room = await prisma.room.findUnique({ where: { code } });
  if (!room) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ state: JSON.parse(room.state), phase: room.phase });
}
