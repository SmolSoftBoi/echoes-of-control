import React from 'react';

export type AnchorProps = {
  /** Button label */
  label: string;
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>;

export type NativeButtonProps = {
  /** Button label */
  label: string;
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export type ButtonProps = AnchorProps | NativeButtonProps;

/**
 * Primary button component.
 */
export function Button(props: ButtonProps) {
  const { label, className } = props;
  const classes = `rounded bg-foreground px-4 py-2 text-background hover:opacity-90 ${className ?? ''}`;

  if ('href' in props && props.href) {
    const { href, ...anchorProps } = props;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {label}
      </a>
    );
  }

  const buttonProps = props as NativeButtonProps;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {label}
    </button>
  );
}
