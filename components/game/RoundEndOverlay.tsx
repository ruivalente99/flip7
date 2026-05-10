'use client';

import { Button } from '@/components/ui/button';
import type { GameState } from '@/lib/game/types';

interface RoundEndOverlayProps {
  state: GameState;
  isHost: boolean;
  onBeginRound: () => void;
}

export function RoundEndOverlay({ state, isHost, onBeginRound }: RoundEndOverlayProps) {
  if (state.phase !== 'ROUND_END') return null;

  const sorted = [...state.players].sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-in fade-in duration-300">
      <div className="w-full max-w-sm mx-4 bg-card border border-border rounded-[var(--radius-xl)] p-6 space-y-5 animate-in zoom-in-75 duration-400">
        <h2 className="text-2xl font-black text-foreground text-center">Round {state.round} Over</h2>

        <div className="space-y-2">
          {sorted.map((p, i) => (
            <div key={p.id} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs w-4">{i + 1}.</span>
                <span className="text-foreground">{p.name}</span>
                {p.roundState.busted && (
                  <span className="text-red-400 text-xs">bust</span>
                )}
                {p.roundState.isLucky7 && (
                  <span className="text-yellow-400 text-xs">Lucky 7</span>
                )}
              </div>
              <div className="text-right">
                <span className="text-muted-foreground text-sm">+{p.roundState.roundScore}</span>
                <span className="text-foreground font-bold ml-3">{p.totalScore}</span>
              </div>
            </div>
          ))}
        </div>

        {state.config.pointTarget > 0 && (
          <p className="text-muted-foreground text-xs text-center">
            First to {state.config.pointTarget} wins
          </p>
        )}

        {isHost && (
          <Button
            onClick={onBeginRound}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-5"
          >
            Next Round →
          </Button>
        )}
        {!isHost && (
          <p className="text-center text-muted-foreground text-sm">Waiting for host to start next round…</p>
        )}
      </div>
    </div>
  );
}
