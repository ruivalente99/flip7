'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import { Button } from '@/components/ui/button';

export default function LobbyPage() {
  const params = useParams();
  const code = params.code as string;
  const router = useRouter();
  const { playerId, roomCode } = useGameStore();
  const [players, setPlayers] = useState<{ id: string; name: string }[]>([]);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    const poll = async () => {
      const res = await fetch(`/api/room/${code}/state`);
      if (!res.ok) return;
      const data = await res.json();
      setPlayers(data.state.config.players);
      setIsHost(data.state.config.players[0]?.id === playerId);
      if (data.phase !== 'LOBBY') {
        router.push(`/room/${code}`);
      }
    };

    poll();
    const interval = setInterval(poll, 2000);
    return () => clearInterval(interval);
  }, [code, playerId]);

  const startGame = async () => {
    await fetch(`/api/room/${code}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerId, action: { type: 'START_GAME' } }),
    });
    router.push(`/room/${code}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-6">
      <div className="text-center">
        <h1 className="text-3xl font-black text-white mb-1">Room Lobby</h1>
        <div className="bg-slate-800 rounded-xl px-6 py-3 inline-block">
          <span className="text-indigo-400 font-mono text-3xl font-bold tracking-widest">
            {code}
          </span>
        </div>
        <p className="text-slate-500 text-sm mt-2">Share this code with friends</p>
      </div>

      <div className="w-full max-w-sm bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-700">
          <span className="text-slate-400 text-sm">
            Players ({players.length}/6)
          </span>
        </div>
        <ul className="divide-y divide-slate-800">
          {players.map((p, i) => (
            <li key={p.id} className="px-4 py-3 flex items-center gap-2">
              <span className="text-slate-500 text-xs w-4">{i + 1}.</span>
              <span className="text-white">{p.name}</span>
              {i === 0 && (
                <span className="ml-auto text-xs text-indigo-400 font-medium">Host</span>
              )}
              {p.id === playerId && (
                <span className="ml-auto text-xs text-slate-500">(you)</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {isHost ? (
        <Button
          onClick={startGame}
          disabled={players.length < 2}
          className="w-full max-w-sm bg-indigo-600 hover:bg-indigo-500 font-bold py-5 text-lg"
        >
          {players.length < 2 ? 'Waiting for players…' : 'Start Game'}
        </Button>
      ) : (
        <p className="text-slate-500">Waiting for host to start…</p>
      )}
    </div>
  );
}
