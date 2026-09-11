/** Attach delegated copy handling and return a cleanup function for tests or remounts. */
export function initCopyButtons(root: Document = document): () => void {
  const handleCopy = async (event: Event): Promise<void> => {
    const origin = event.target;
    if (!(origin instanceof Element)) return;
    const target = origin.closest<HTMLButtonElement>('[data-copy-button]');
    if (!target) return;
    const block = target.closest<HTMLElement>('[data-command-block]');
    const source = block?.querySelector<HTMLTextAreaElement>('.copy-source');
    const status = block?.querySelector<HTMLElement>('[data-copy-status]');
    if (!source || !status) return;

    target.disabled = true;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(source.value);
      const originalLabel = target.getAttribute('aria-label') ?? 'コピー';
      const originalTitle = target.getAttribute('title') ?? originalLabel;
      target.dataset.copyState = 'success';
      target.setAttribute('aria-label', 'コピーしました');
      target.setAttribute('title', 'コピーしました');
      status.textContent = 'クリップボードにコピーしました。';
      window.setTimeout(() => {
        delete target.dataset.copyState;
        target.setAttribute('aria-label', originalLabel);
        target.setAttribute('title', originalTitle);
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
