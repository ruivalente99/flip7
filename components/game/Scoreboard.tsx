'use client';

import type { Player, GameConfig } from '@/lib/game/types';

interface ScoreboardProps {
  players: Player[];
  config: GameConfig;
  round: number;
  currentPlayerIndex: number;
}

export function Scoreboard({ players, config, round, currentPlayerIndex }: ScoreboardProps) {
  const sorted = [...players].sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-slate-300 font-semibold text-sm uppercase tracking-wide">
          Scores
        </h3>
        <span className="text-slate-500 text-xs">Round {round}</span>
      </div>
      <div className="space-y-2">
        {sorted.map((player, rank) => {
          const isActive = players[currentPlayerIndex]?.id === player.id;
          const progress = config.pointTarget > 0
            ? Math.min((player.totalScore / config.pointTarget) * 100, 100)
            : 0;

          return (
            <div
              key={player.id}
              className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                isActive ? 'bg-indigo-900/50' : 'bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-xs w-4">{rank + 1}.</span>
                <span className="text-white text-sm font-medium">{player.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {config.pointTarget > 0 && (
                  <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
                <span className="text-white font-bold text-sm w-12 text-right">
                  {player.totalScore}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {config.pointTarget > 0 && (
        <p className="text-slate-600 text-xs mt-2 text-center">
          First to {config.pointTarget} wins
        </p>
      )}
    </div>
  );
}
