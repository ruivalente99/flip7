'use client';

import { bustProbability } from '@/lib/game/scoring';
import type { Card } from '@/lib/game/types';

interface RiskIndicatorProps {
  deck: Card[];
  hand: Card[];
}

export function RiskIndicator({ deck, hand }: RiskIndicatorProps) {
  const prob = bustProbability(deck, hand);
  const pct = Math.round(prob * 100);

  const barColor =
    pct >= 60 ? 'bg-red-500' :
    pct >= 35 ? 'bg-orange-400' :
    pct >= 15 ? 'bg-yellow-400' :
    'bg-emerald-500';

  const textColor =
    pct >= 60 ? 'text-red-400 font-bold' :
    pct >= 35 ? 'text-orange-400 font-bold' :
    pct >= 15 ? 'text-yellow-500' :
    'text-emerald-400';

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Bust risk</span>
        <span className={textColor}>{pct}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
