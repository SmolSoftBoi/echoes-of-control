'use client';
import React from 'react';

import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '@utils/cn';

/**
 * FadeIn displays its children with a simple fade‑in animation.
 */
export function FadeIn({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLMotionProps<'div'>>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

