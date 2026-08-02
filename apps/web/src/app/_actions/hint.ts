'use server';

import { generateText } from './openai';

/**
 * Generate a subtle hint for a puzzle.
 *
 * @param puzzle - Description of the puzzle.
 * @returns Generated hint text.
 */
export async function generateHint(puzzle: string): Promise<string> {
  const prompt =
    `Offer a single subtle hint for the following puzzle without revealing the answer:\n${puzzle}`;
  return generateText(prompt);
}
