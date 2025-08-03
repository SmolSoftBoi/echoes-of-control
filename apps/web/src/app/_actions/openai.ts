'use server';

import OpenAI from 'openai';

/**
 * Generate text using OpenAI's Responses API.
 *
 * @param prompt - The prompt to send to OpenAI.
 * @returns The generated text.
 */
export async function generateText(prompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OpenAI API key is missing');

  const client = new OpenAI({ apiKey });
  const { output_text } = await client.responses.create({
    model: 'gpt-4.1-mini',
    input: prompt,
  });

  return output_text ?? '';
}
