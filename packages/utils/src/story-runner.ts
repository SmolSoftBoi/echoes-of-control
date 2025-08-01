export interface StoryRunner<TInput, TOutput>
  extends Iterator<TOutput, void, TInput> {
  /** Current value from the story */
  readonly current: TOutput | undefined;
  /** Reset the story to the beginning. */
  reset(): void;
  /**
   * Step through the story.
   *
   * @param input - Input to feed into the story.
   * @returns Result of the next iteration.
   */
  step(input?: TInput): IteratorResult<TOutput, void>;
  [Symbol.iterator](): StoryRunner<TInput, TOutput>;
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
export function createStoryRunner<TInput = unknown, TOutput = unknown>(
  factory: () => Generator<TOutput, void, TInput>,
): StoryRunner<TInput, TOutput> {
  let iterator = factory();
  let current: TOutput | undefined;

  return {
    get current() {
      return current;
    },
    step(input?: TInput): IteratorResult<TOutput, void> {
      const result =
        input === undefined ? iterator.next() : iterator.next(input);

      if (result.done) {
        current = undefined;
        return { done: true, value: undefined };
      }

      current = result.value;
      return { done: false, value: current };
    },
    next(input?: TInput): IteratorResult<TOutput, void> {
      return this.step(input);
    },
    [Symbol.iterator](): StoryRunner<TInput, TOutput> {
      return this;
    },
    reset() {
      iterator = factory();
      current = undefined;
    },
  };
}
