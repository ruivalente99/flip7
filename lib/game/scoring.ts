import type { Card } from './types';

export const FLIP7_BONUS = 15;

export function calculateRoundScore(hand: Card[], isFlip7: boolean): number {
  let base = hand
    .filter((c) => c.type === 'number')
    .reduce((sum, c) => sum + (c.value ?? 0), 0);

  if (hand.some((c) => c.type === 'x2')) base *= 2;
  if (hand.some((c) => c.type === 'plus3')) base += 3;
  if (isFlip7) base += FLIP7_BONUS;

  return base;
}

export function bustProbability(deck: Card[], hand: Card[]): number {
  if (deck.length === 0) return 0;
  const held = new Set(
    hand.filter((c) => c.type === 'number').map((c) => c.value!)
  );
  const danger = deck.filter(
    (c) => c.type === 'number' && held.has(c.value!)
  );
  return danger.length / deck.length;
}

export function countUniqueNumbers(hand: Card[]): number {
  return new Set(hand.filter((c) => c.type === 'number').map((c) => c.value!))
    .size;
}
