import { describe, expect, it } from 'vitest';
import { normalizeSnippet } from '../../src/lib/snippets';

describe('normalizeSnippet', () => {
  it('normalizes CRLF and removes only one final line feed', () => {
    expect(normalizeSnippet('  echo "$HOME"\r\n\t--flag \\\r\n\r\n')).toBe('  echo "$HOME"\n\t--flag \\\n');
  });

  it('preserves shell-like text as inert content', () => {
    const snippet = 'echo $(whoami) && printf "<SAMPLE>&"';
    expect(normalizeSnippet(snippet)).toBe(snippet);
  });
});
