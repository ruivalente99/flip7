'use client';

import { GameCard } from './GameCard';
import type { Card } from '@/lib/game/types';

interface DeckCounterProps {
  deck: Card[];
  discardPile: Card[];
}

export function DeckCounter({ deck, discardPile }: DeckCounterProps) {
  const topDiscard = discardPile[0];

  return (
    <div className="flex items-center gap-6 justify-center">
      <div className="flex flex-col items-center gap-1">
        <div className="relative">
          <GameCard card={{ id: 'back', type: 'number' }} faceDown />
          <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow">
            {deck.length}
          </span>
        </div>
        <span className="text-slate-400 text-xs">Deck</span>
      </div>

      {topDiscard && (
        <div className="flex flex-col items-center gap-1">
          <GameCard card={topDiscard} />
          <span className="text-slate-400 text-xs">Last flipped</span>
        </div>
      )}
    </div>
  );
}
