'use client';

import { Progress } from '@/components/ui/progress';
import { bustProbability } from '@/lib/game/scoring';
import type { Card } from '@/lib/game/types';

interface RiskIndicatorProps {
  deck: Card[];
  hand: Card[];
}

export function RiskIndicator({ deck, hand }: RiskIndicatorProps) {
  const prob = bustProbability(deck, hand);
  const pct = Math.round(prob * 100);

  const color =
    pct >= 60 ? 'bg-red-500' :
    pct >= 35 ? 'bg-orange-400' :
    pct >= 15 ? 'bg-yellow-400' :
    'bg-green-500';

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs text-slate-400">
        <span>Bust risk</span>
        <span
          className={
            pct >= 60 ? 'text-red-400 font-bold' :
            pct >= 35 ? 'text-orange-400 font-bold' :
            pct >= 15 ? 'text-yellow-400' :
            'text-green-400'
          }
        >
          {pct}%
        </span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
