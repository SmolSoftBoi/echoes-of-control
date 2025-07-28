import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button label
   */
  label: string;
}

/**
 * Primary button component.
 */
export function Button({ label, className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`rounded bg-foreground px-4 py-2 text-background hover:opacity-90 ${className ?? ''}`}
      {...props}
    >
      {label}
    </button>
  );
}
