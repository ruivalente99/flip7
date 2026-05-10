'use client';

import { Button } from '@/components/ui/button';
import { useGameStore } from '@/store/gameStore';

export function PassDeviceModal() {
  const { ui, setUI, localGame } = useGameStore();

  if (!ui.showPassDeviceModal || !localGame) return null;

  const current = localGame.players[localGame.currentPlayerIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="text-center space-y-6 p-8 rounded-2xl bg-slate-900 border border-slate-700 max-w-sm w-full mx-4">
        <div className="text-6xl">📱</div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Pass the device</h2>
          <p className="text-slate-400">
            Hand off to{' '}
            <span className="text-indigo-400 font-semibold">{current?.name}</span>
          </p>
        </div>
        <Button
          onClick={() => setUI({ showPassDeviceModal: false })}
          className="w-full bg-indigo-600 hover:bg-indigo-500 font-bold py-5 text-lg"
        >
          I'm {current?.name} — Ready!
        </Button>
      </div>
    </div>
  );
}
