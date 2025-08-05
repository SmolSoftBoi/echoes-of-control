'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@utils/cn';

/**
 * Paragraph that fades in when it enters the viewport.
 */
export type FadeInParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;

export function FadeInParagraph({ className, children, ...props }: FadeInParagraphProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <p
      ref={ref}
      className={cn(
        'opacity-0 transition-opacity duration-700',
        visible && 'opacity-100',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
