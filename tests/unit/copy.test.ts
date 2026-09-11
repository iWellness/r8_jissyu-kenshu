// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { initCopyButtons } from '../../src/scripts/copy';

const block = `
  <section data-command-block>
    <button data-copy-button aria-label="コピー" title="コピー"><svg data-copy-icon></svg></button>
    <textarea class="copy-source">echo "$HOME"\n  --flag \\</textarea>
    <p data-copy-status></p>
  </section>`;

describe('copy interaction', () => {
  let cleanup: () => void;

  beforeEach(() => {
    document.body.innerHTML = block;
    cleanup = initCopyButtons(document);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('copies the exact source and reports success', async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    document.querySelector<HTMLButtonElement>('[data-copy-button]')?.click();
    await vi.waitFor(() => expect(writeText).toHaveBeenCalledOnce());
    expect(writeText).toHaveBeenCalledWith('echo "$HOME"\n  --flag \\');
    expect(document.querySelector('[data-copy-icon]')).not.toBeNull();
    expect(document.querySelector('[data-copy-button]')?.getAttribute('aria-label')).toBe('コピーしました');
    expect(document.querySelector('[data-copy-status]')?.textContent).toContain('コピーしました');
  });

  it('does not claim success when the Clipboard API rejects', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    document.querySelector<HTMLButtonElement>('[data-copy-button]')?.click();
    await vi.waitFor(() => expect(document.querySelector('[data-copy-status]')?.textContent).toContain('選択してコピー'));
    expect(document.querySelector<HTMLButtonElement>('[data-copy-button]')?.disabled).toBe(false);
  });
});
