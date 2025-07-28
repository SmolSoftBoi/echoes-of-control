import { describe, expect, it } from 'vitest';
import { cn } from '../cn';

describe('cn', () => {
  it('merges class names and removes duplicates', () => {
    expect(cn('p-2', 'text-bold', 'p-2')).toBe('text-bold p-2');
  });
});
