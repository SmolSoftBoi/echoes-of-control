import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../_actions/openai', () => ({ generateText: vi.fn() }));

import { generateFlavour } from '../_actions/flavour';
import { generateText } from '../_actions/openai';

const mockGenerateText = vi.mocked(generateText);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('flavour server actions', () => {
  it('creates flavour text for a topic', async () => {
    mockGenerateText.mockResolvedValue('Moody hall');

    const result = await generateFlavour('a dark hallway');

    expect(generateText).toHaveBeenCalledWith(
      'Compose a single immersive sentence about a dark hallway for a mystery game.',
    );
    expect(result).toBe('Moody hall');
  });
});
