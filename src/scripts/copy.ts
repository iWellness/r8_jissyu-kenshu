/** Attach delegated copy handling and return a cleanup function for tests or remounts. */
export function initCopyButtons(root: Document = document): () => void {
  const handleCopy = async (event: Event): Promise<void> => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement) || !target.matches('[data-copy-button]')) return;
    const block = target.closest<HTMLElement>('[data-command-block]');
    const source = block?.querySelector<HTMLTextAreaElement>('.copy-source');
    const status = block?.querySelector<HTMLElement>('[data-copy-status]');
    if (!source || !status) return;

    target.disabled = true;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(source.value);
      const original = target.textContent ?? 'コピー';
      target.textContent = 'コピーしました';
      status.textContent = 'クリップボードにコピーしました。';
      window.setTimeout(() => {
        target.textContent = original;
        status.textContent = '';
        target.disabled = false;
      }, 2000);
    } catch {
      status.textContent = 'コピーできませんでした。コードを選択してコピーしてください。';
      target.disabled = false;
    }
  };
  root.addEventListener('click', handleCopy);
  return () => root.removeEventListener('click', handleCopy);
}
