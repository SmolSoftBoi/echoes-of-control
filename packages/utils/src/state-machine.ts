/**
 * Generic finite state machine implementation.
 */

export type TransitionMap<S extends string, E extends string> = Record<
  S,
  Partial<Record<E, S>>
>;

export interface StateMachineConfig<S extends string, E extends string> {
  /** Initial state. */
  readonly initial: S;
  /** Map of state transitions. */
  readonly transitions: TransitionMap<S, E>;
}

/**
 * State machine instance.
 */
export interface StateMachine<S extends string, E extends string> {
  /** Current state. */
  readonly state: S;
  /**
   * Send an event to transition the machine.
   *
   * @param event - Event to handle.
   * @returns The resulting state.
   */
  send(event: E): S;
  /**
   * Check if the machine can handle the event.
   *
   * @param event - Event to test.
   * @returns `true` if a transition exists.
   */
  can(event: E): boolean;
}

/**
 * Create a new finite state machine.
 *
 * @param config - Machine configuration.
 * @returns A state machine instance.
 */
export function createStateMachine<S extends string, E extends string>(
  config: StateMachineConfig<S, E>,
): StateMachine<S, E> {
  let current = config.initial;

  const getTransition = (state: S, event: E): S | undefined =>
    config.transitions[state]?.[event];

  const machine: StateMachine<S, E> = {
    get state() {
      return current;
    },
    send(event) {
      const next = getTransition(current, event);
      if (next) {
        current = next;
      }
      return current;
    },
    can(event) {
      return getTransition(current, event) !== undefined;
    },
  };

  return machine;
}
