import { NextRequest } from 'next/server';
import prisma from '@/lib/db/client';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const since = parseInt(req.nextUrl.searchParams.get('since') ?? '0', 10);

  const room = await prisma.room.findUnique({ where: { code }, select: { id: true } });
  if (!room) {
    return new Response('Room not found', { status: 404 });
  }

  const roomId = room.id;

  const stream = new ReadableStream({
    async start(controller) {
      let lastSeq = since;
      let closed = false;

      req.signal.addEventListener('abort', () => {
        closed = true;
        controller.close();
      });

      const send = (data: string) => {
        if (closed) return;
        try {
          controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
        } catch {
          closed = true;
        }
      };

      // Send current state immediately
      const currentRoom = await prisma.room.findUnique({ where: { id: roomId } });
      if (currentRoom) {
        send(JSON.stringify({ seq: lastSeq, state: JSON.parse(currentRoom.state) }));
      }

      // Poll for new events
      while (!closed) {
        await new Promise((r) => setTimeout(r, 500));
        if (closed) break;

        const events = await prisma.roomEvent.findMany({
          where: { roomId, seq: { gt: lastSeq } },
          orderBy: { seq: 'asc' },
        });

        for (const event of events) {
          if (closed) break;
          const payload = JSON.parse(event.payload);
          send(JSON.stringify({ seq: event.seq, state: payload.state }));
          lastSeq = event.seq;
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
