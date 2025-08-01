export interface StoryRunner<TInput, TOutput> {
  /** Current value from the story */
  readonly current: TOutput | undefined;
  /**
   * Advance the story with optional input.
   *
   * @param input - Input to feed into the story.
   * @returns Next output value or `undefined` if finished.
   */
  step(input?: TInput): TOutput | undefined;
  /** Reset the story to the beginning. */
  reset(): void;
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
    step(input) {
      const result = iterator.next(input);
      if (result.done) {
        current = undefined;
        return undefined;
      }
      current = result.value;
      return current;
    },
    reset() {
      iterator = factory();
      current = undefined;
    },
  };
}
