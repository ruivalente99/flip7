'use client';

import { Button } from '@/components/ui/button';
import { useGameStore } from '@/store/gameStore';
import { useRouter } from 'next/navigation';

export function WinOverlay() {
  const { ui, setUI, localGame, clearLocalGame } = useGameStore();
  const router = useRouter();

  if (!ui.showWinOverlay || !localGame) return null;

  const winner = localGame.players.find((p) => p.id === localGame.winner);

  const handleClose = () => {
    try {
      const raw = localStorage.getItem('flip7:stats');
      const stats = raw ? JSON.parse(raw) : { wins: 0, losses: 0, highScore: 0 };
      const myScore = winner?.totalScore ?? 0;
      stats.highScore = Math.max(stats.highScore, myScore);
      localStorage.setItem('flip7:stats', JSON.stringify(stats));
    } catch {}

    setUI({ showWinOverlay: false });
    clearLocalGame();
    router.push('/');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-in fade-in duration-300">
      <div className="text-center space-y-6 p-8 rounded-[var(--radius-xl)] bg-card border border-border max-w-sm w-full mx-4 animate-in zoom-in-75 duration-500">
        <div className="text-7xl">🏆</div>
        <div>
          <h2 className="text-4xl font-black text-yellow-400 mb-1">Game Over!</h2>
          <p className="text-xl text-foreground">
            <span className="font-bold text-yellow-300">{winner?.name ?? 'Unknown'}</span> wins!
          </p>
          <p className="text-muted-foreground mt-1 text-lg">{winner?.totalScore} points</p>
        </div>
        <div className="space-y-1 text-sm text-muted-foreground">
          {[...localGame.players]
            .sort((a, b) => b.totalScore - a.totalScore)
            .map((p, i) => (
              <div key={p.id} className="flex justify-between">
                <span>{i + 1}. {p.name}</span>
                <span className="font-bold text-foreground">{p.totalScore}</span>
              </div>
            ))}
        </div>
        <Button
          onClick={handleClose}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-5"
        >
          Back to Menu
        </Button>
      </div>
    </div>
  );
}
