'use client';

import { useGameStore } from '@/store/gameStore';
import type { GameAction } from '@/lib/game/types';

export function useGameEngine() {
  const { localGame, dispatchLocal } = useGameStore();

  const dispatch = (action: GameAction) => {
    if (!localGame) return;
    dispatchLocal(action);
  };

  return { state: localGame, dispatch };
}
