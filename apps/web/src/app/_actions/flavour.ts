'use server';

import { generateText } from './openai';

/**
 * Generate atmospheric flavour text for a topic.
 *
 * @param topic - Subject to describe.
 * @returns Generated flavour text.
 */
export async function generateFlavour(topic: string): Promise<string> {
  const prompt = `Compose a single immersive sentence about ${topic} for a mystery game.`;
  return generateText(prompt);
}
