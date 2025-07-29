/**
 * Minimal Storybook types used for stubs.
 */
declare module '@storybook/react' {
  export interface Meta<TArgs = unknown> extends Record<string, unknown> {
    args?: TArgs;
  }
  export interface StoryObj<TArgs = unknown> extends Record<string, unknown> {
    args?: TArgs;
  }
}
