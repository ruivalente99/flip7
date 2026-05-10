'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';

export function BustOverlay() {
  const { ui, setUI } = useGameStore();

  useEffect(() => {
    if (!ui.showBustOverlay) return;
    const t = setTimeout(() => setUI({ showBustOverlay: false, bustingPlayerName: null }), 2000);
    return () => clearTimeout(t);
  }, [ui.showBustOverlay]);

  if (!ui.showBustOverlay) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-in fade-in duration-200">
      <div className="text-center animate-in zoom-in-50 duration-300">
        <div className="text-8xl mb-4">💥</div>
        <h2 className="text-5xl font-black text-red-500 mb-2 brand-heading">BUST!</h2>
        <p className="text-xl text-foreground/80">
          {ui.bustingPlayerName ?? 'Player'} loses their round score
        </p>
      </div>
    </div>
  );
}
