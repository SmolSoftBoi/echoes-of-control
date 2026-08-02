import { describe, expect, it } from 'vitest';

import {
  createStoryletEngine,
  type Storylet,
} from '../storylet-engine';

describe('storylet engine', () => {
  interface State {
    score: number;
  }
  type Id = 'start' | 'mid' | 'end';

  const storylets: Storylet<State, Id>[] = [
    { id: 'start', weight: 1, when: (s) => s.score >= 0 },
    { id: 'mid', weight: 2, when: (s) => s.score > 5 },
    { id: 'end', when: (s) => s.score > 10 },
  ];

  it('filters storylets by conditions', () => {
    const engine = createStoryletEngine<State, Id>({
      storylets,
      random: () => 0,
    });
    const available = engine.available({ score: 7 }).map((s) => s.id);
    expect(available).toEqual(['start', 'mid']);
  });

  it('selects storylets using weights', () => {
    const engine = createStoryletEngine<State, Id>({
      storylets,
      random: () => 0.75,
    });
    expect(engine.select({ score: 6 })?.id).toBe('mid');
  });

  it('returns undefined when none available', () => {
    const engine = createStoryletEngine<State, Id>({
      storylets,
      random: () => 0,
    });
    expect(engine.select({ score: -1 })).toBeUndefined();
  });
});
