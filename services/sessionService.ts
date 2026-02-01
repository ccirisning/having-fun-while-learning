
import { KANA_REGISTRY } from '../data/kanaData';

/**
 * Fisher-Yates Shuffle Algorithm for high-entropy randomization.
 */
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Generates a randomized study session of a specific size.
 * Accesses all characters in the registry (no locks).
 */
export const generateSession = (size: number): string[] => {
  const allIds = Object.keys(KANA_REGISTRY);
  const shuffled = shuffle(allIds);
  
  // Return the smaller of the requested size or total available items
  return shuffled.slice(0, Math.min(size, shuffled.length));
};
