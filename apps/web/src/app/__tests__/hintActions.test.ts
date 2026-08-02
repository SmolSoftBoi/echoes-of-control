import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../_actions/openai', () => ({ generateText: vi.fn() }));

import { generateHint } from '../_actions/hint';
import { generateText } from '../_actions/openai';

const mockGenerateText = vi.mocked(generateText);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('hint server actions', () => {
  it('creates a hint for a puzzle', async () => {
    mockGenerateText.mockResolvedValue('Check the painting 🖼️');

    const result = await generateHint('A locked door puzzle');

    expect(generateText).toHaveBeenCalledWith(
      'Offer a single subtle hint for the following puzzle without revealing the answer:\nA locked door puzzle',
    );
    expect(result).toBe('Check the painting 🖼️');
  });
});
