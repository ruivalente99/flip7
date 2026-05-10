import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const EMOJIS = [
  '🦊','🐺','🦁','🐯','🐻','🐼','🐨','🦊','🦝','🦔',
  '🦉','🦅','🦜','🐉','🦄','🦋','🐙','🦑','🦀','🐬',
  '🌵','🌴','🍄','🌊','⚡','🌙','🔥','💎','🎭','🎯',
];

function randomEmoji() {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

export { EMOJIS };

interface PlayerStore {
  name: string;
  emoji: string;
  setName: (name: string) => void;
  setEmoji: (emoji: string) => void;
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set) => ({
      name: 'Player 1',
      emoji: randomEmoji(),
      setName: (name) => set({ name }),
      setEmoji: (emoji) => set({ emoji }),
    }),
    { name: 'flip7:player' }
  )
);
