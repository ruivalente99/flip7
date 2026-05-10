'use client';

import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
import type { GameState } from '@/lib/game/types';

export function useRoomSync(code: string | null) {
  const { setOnlineGame, lastSeq, setLastSeq, playerId } = useGameStore();
  const esRef = useRef<EventSource | null>(null);
  const seqRef = useRef(lastSeq);

  useEffect(() => {
    seqRef.current = lastSeq;
  }, [lastSeq]);

  useEffect(() => {
    if (!code) return;

    const connect = () => {
      const es = new EventSource(
        `/api/room/${code}/events?since=${seqRef.current}`
      );
      esRef.current = es;

      es.onmessage = (e) => {
        const data = JSON.parse(e.data) as { seq: number; state: GameState };
        seqRef.current = data.seq;
        setLastSeq(data.seq);
        setOnlineGame(data.state);
      };

      es.onerror = () => {
        es.close();
        setTimeout(connect, 2000);
      };
    };

    connect();

    const heartbeat = setInterval(() => {
      if (!playerId) return;
      fetch(`/api/room/${code}/join`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId }),
      }).catch(() => {});
    }, 10_000);

    return () => {
      esRef.current?.close();
      clearInterval(heartbeat);
    };
  }, [code]);
}
