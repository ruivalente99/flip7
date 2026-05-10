'use client';

import { Button } from '@/components/ui/button';
import { useGameStore } from '@/store/gameStore';

export function PassDeviceModal() {
  const { ui, setUI, localGame } = useGameStore();

  if (!ui.showPassDeviceModal || !localGame) return null;

  const current = localGame.players[localGame.currentPlayerIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="text-center space-y-6 p-8 rounded-[var(--radius-xl)] bg-card border border-border max-w-sm w-full mx-4">
        <div className="text-6xl">📱</div>
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">Pass the device</h2>
          <p className="text-muted-foreground">
            Hand off to{' '}
            <span className="text-primary font-semibold">{current?.name}</span>
          </p>
        </div>
        <Button
          onClick={() => setUI({ showPassDeviceModal: false })}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-5 text-lg"
        >
          I'm {current?.name} — Ready!
        </Button>
      </div>
    </div>
  );
}
