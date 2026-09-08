import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('migrated command regressions', () => {
  it('keeps the DADA2 thread option in the denoise command', async () => {
    const snippet = await readFile('src/snippets/05-qiime2/07-denoise.txt', 'utf8');
    expect(snippet).toContain('--o-base-transition-stats ./03_denoise/base-transition-stats.qza \\\n    --p-n-threads 3');
  });

  it('checks the batch directory from its current location', async () => {
    const snippet = await readFile('src/snippets/01-linux/28-batch.txt', 'utf8');
    expect(snippet).toContain('tree . 2>/dev/null || ls -R .');
    expect(snippet).not.toContain('tree batch_analysis');
  });

  it('uses the primer file created by the preceding lesson step', async () => {
    const created = await readFile('src/snippets/01-linux/20-save-primer.txt', 'utf8');
    const inspected = await readFile('src/snippets/01-linux/24-cat-primer.txt', 'utf8');
    expect(created).toContain('> primer.txt');
    expect(inspected.trim()).toBe('cat primer.txt');
  });
});
