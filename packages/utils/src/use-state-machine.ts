import { useReducer, useRef } from 'react';
import {
  createStateMachine,
  type StateMachine,
  type StateMachineConfig,
} from './state-machine';

/**
 * React hook wrapping {@link createStateMachine}. It triggers a re-render when
 * the state changes.
 *
 * @param config - Machine configuration.
 * @returns A state machine instance bound to React.
 */
export function useStateMachine<S extends string, E extends string>(
  config: StateMachineConfig<S, E>,
): StateMachine<S, E> {
  const [, forceUpdate] = useReducer((c) => c + 1, 0);
  const machineRef = useRef<StateMachine<S, E> | null>(null);

  if (!machineRef.current) {
    machineRef.current = createStateMachine({
      ...config,
      onChange(next, prev) {
        config.onChange?.(next, prev);
        forceUpdate();
      },
    });
  }

  return machineRef.current;
}
