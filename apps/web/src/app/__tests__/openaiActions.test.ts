import { beforeEach, describe, expect, it, vi } from 'vitest';

const create = vi.fn();
vi.mock('openai', () => ({ default: vi.fn(() => ({ responses: { create } })) }));

import { generateText } from '../_actions/openai';

beforeEach(() => {
  vi.clearAllMocks();
  process.env.OPENAI_API_KEY = 'test-key';
});

describe('openai server actions', () => {
  it('generates text from prompt', async () => {
    create.mockResolvedValue({ output_text: 'Hello' });

    const result = await generateText('Hi');

    expect(create).toHaveBeenCalledWith({
      model: 'gpt-4.1-mini',
      input: 'Hi',
    });
    expect(result).toBe('Hello');
  });

  it('throws when API key is missing', async () => {
    delete process.env.OPENAI_API_KEY;

    await expect(generateText('Hi')).rejects.toThrow('OpenAI API key is missing');
  });
});
