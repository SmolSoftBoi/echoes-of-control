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

    expect(runner.step().value).toBe('intro');
    expect(runner.step().value).toBe('choose');
    expect(runner.step('ok').value).toBe('end:ok');
    expect(runner.step().done).toBe(true);
  });

  it('resets the story', () => {
    function* story() {
      yield 1;
      yield 2;
    }
    const runner = createStoryRunner(story);
    runner.step();
    runner.reset();
    expect(runner.step().value).toBe(1);
  });
});
