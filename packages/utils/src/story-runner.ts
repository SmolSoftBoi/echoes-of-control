export interface StoryRunner<TInput, TOutput, TVars extends Record<string, unknown> = Record<string, unknown>>
  extends Iterator<TOutput, void, TInput> {
  /** Current value from the story */
  readonly current: TOutput | undefined;
  /** Collected variable values */
  readonly variables: Partial<TVars>;
  /** Reset the story to the beginning. */
  reset(): void;
  /**
   * Step through the story.
   *
   * @param input - Input to feed into the story.
   * @returns Result of the next iteration.
  */
  step(input?: TInput): IteratorResult<TOutput, void>;
  [Symbol.iterator](): StoryRunner<TInput, TOutput, TVars>;
}

/**
 * Wrap a generator-based story for runtime control.
 *
 * The provided factory creates a new generator when called. Each call to
 * {@link StoryRunner.step} yields the next value from the generator.
 *
 * @param factory - Function returning a story generator.
 * @returns A runtime wrapper around the story.
 */
export type StoryYield<TOutput, TVars extends Record<string, unknown>> =
  | TOutput
  | { value: TOutput; vars?: Partial<TVars> };

export function createStoryRunner<
  TInput = unknown,
  TOutput = unknown,
  TVars extends Record<string, unknown> = Record<string, unknown>,
>(
  factory: () => Generator<StoryYield<TOutput, TVars>, void, TInput>,
): StoryRunner<TInput, TOutput, TVars> {
  let iterator = factory();
  let current: TOutput | undefined;
  let variables: Partial<TVars> = {};

  return {
    get current() {
      return current;
    },
    get variables() {
      return variables;
    },
    step(input?: TInput): IteratorResult<TOutput, void> {
      const result =
        input === undefined ? iterator.next() : iterator.next(input);

      if (result.done) {
        current = undefined;
        return { done: true, value: undefined };
      }
      const output = result.value;
      if (typeof output === 'object' && output !== null && 'value' in output) {
        const { value, vars } = output as {
          value: TOutput;
          vars?: Partial<TVars>;
        };
        current = value;
        if (vars) {
          variables = { ...variables, ...vars };
        }
      } else {
        current = output as TOutput;
      }
      return { done: false, value: current };
    },
    next(input?: TInput): IteratorResult<TOutput, void> {
      return this.step(input);
    },
    [Symbol.iterator](): StoryRunner<TInput, TOutput, TVars> {
      return this;
    },
    reset() {
      iterator = factory();
      current = undefined;
      variables = {};
    },
  };
}
