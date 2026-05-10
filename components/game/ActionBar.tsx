'use client';

import { Button } from '@/components/ui/button';
import { RiskIndicator } from './RiskIndicator';
import type { GameState, GameAction } from '@/lib/game/types';

interface ActionBarProps {
  state: GameState;
  playerId: string;
  onAction: (action: GameAction) => void;
}

export function ActionBar({ state, playerId, onAction }: ActionBarProps) {
  const current = state.players[state.currentPlayerIndex];
  const isMyTurn = current?.id === playerId;
  const rs = current?.roundState;

  if (!isMyTurn || !rs) {
    return (
      <div className="text-center text-slate-500 py-4">
        Waiting for <span className="text-slate-300 font-medium">{current?.name}</span>…
      </div>
    );
  }

  if (rs.busted || rs.stayed || rs.froze) return null;

  return (
    <div className="flex flex-col gap-3">
      <RiskIndicator deck={state.deck} hand={rs.hand} />
      <div className="flex gap-3">
        <Button
          onClick={() => onAction({ type: 'FLIP' })}
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-6 text-lg rounded-xl"
          disabled={state.deck.length === 0}
        >
          🎴 Flip
        </Button>
        <Button
          onClick={() => onAction({ type: 'STAY' })}
          variant="outline"
          className="flex-1 border-slate-600 text-slate-200 hover:bg-slate-700 font-bold py-6 text-lg rounded-xl"
          disabled={rs.hand.length === 0}
        >
          ✋ Stay
        </Button>
      </div>
    </div>
  );
}
