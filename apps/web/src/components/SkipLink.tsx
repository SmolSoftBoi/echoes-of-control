import React from 'react';
import { cn } from '@utils/cn';

/**
 * Hidden skip link for keyboard navigation to the main story.
 */
export type SkipLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  /**
   * Where to skip to.
   * @default '#story'
   */
  href?: string;
};

export function SkipLink({ className, href = '#story', ...props }: SkipLinkProps) {
  return (
    <a
      {...props}
      href={href}
      className={cn(
        'absolute left-[-999px] top-auto h-px w-px overflow-hidden focus:left-2 focus:top-2 focus:h-auto focus:w-auto focus:bg-foreground focus:text-background focus:p-2',
        className,
      )}
    >
      Skip to story 📖
    </a>
  );
}
