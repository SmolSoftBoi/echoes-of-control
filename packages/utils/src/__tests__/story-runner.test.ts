import { describe, expect, it } from 'vitest';
import { createStoryRunner, type StoryYield } from '../story-runner';

describe('createStoryRunner', () => {
  it('steps through a generator story', () => {
    function* story() {
      yield 'intro';
      const choice: string = yield 'choose';
      yield `end:${choice}`;
    }

    const runner = createStoryRunner<string, string, { intro?: boolean; asked?: boolean; name?: string }>(story);

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

  it('tracks variables from yield output', () => {
    function* story(): Generator<
      StoryYield<string, { intro?: boolean; asked?: boolean; name?: string }>,
      void,
      string
    > {
      yield { value: 'intro', vars: { intro: true } };
      const name: string = yield { value: 'ask', vars: { asked: true } };
      yield { value: `end:${name}`, vars: { name } };
    }

    const runner = createStoryRunner<
      string,
      string,
      { intro?: boolean; asked?: boolean; name?: string }
    >(story);

    runner.step();
    expect(runner.variables).toEqual({ intro: true });

    runner.step();
    expect(runner.variables).toEqual({ intro: true, asked: true });

    runner.step('sam');
    expect(runner.variables).toEqual({ intro: true, asked: true, name: 'sam' });

    runner.reset();
    expect(runner.variables).toEqual({});
  });
});
