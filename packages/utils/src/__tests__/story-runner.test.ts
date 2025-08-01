import { describe, expect, it } from 'vitest';
import { createStoryRunner } from '../story-runner';

describe('createStoryRunner', () => {
  it('steps through a generator story', () => {
    function* story() {
      yield 'intro';
      const choice: string = yield 'choose';
      yield `end:${choice}`;
    }

    const runner = createStoryRunner(story);

    expect(runner.step()).toBe('intro');
    expect(runner.step()).toBe('choose');
    expect(runner.step('ok')).toBe('end:ok');
    expect(runner.step()).toBeUndefined();
  });

  it('resets the story', () => {
    function* story() {
      yield 1;
      yield 2;
    }
    const runner = createStoryRunner(story);
    runner.step();
    runner.reset();
    expect(runner.step()).toBe(1);
  });
});
