import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('textbook typography', () => {
  it('uses a locally bundled Japanese font with readable spacing', async () => {
    const [styles, packageJson] = await Promise.all([
      readFile('src/styles/global.css', 'utf8'),
      readFile('package.json', 'utf8'),
    ]);

    expect(packageJson).toContain('@fontsource-variable/noto-sans-jp');
    expect(styles).toContain("@import '@fontsource-variable/noto-sans-jp';");
    expect(styles).toContain("--font-sans: 'Noto Sans JP Variable'");
    expect(styles).toMatch(/body[^}]+font-size:\s*16\.5px[^}]+line-height:\s*1\.85/);
    expect(styles).toMatch(/h1, h2, h3[^}]+letter-spacing:\s*\.01em/);
  });
});
