import { initCopyButtons } from './copy';

function initNavigation(): void {
  const open = document.querySelector<HTMLButtonElement>('[data-nav-open]');
  const close = document.querySelector<HTMLButtonElement>('[data-nav-close]');
  const drawer = document.querySelector<HTMLElement>('[data-nav-drawer]');
  const backdrop = document.querySelector<HTMLElement>('[data-nav-backdrop]');
  if (!open || !close || !drawer || !backdrop) return;

  const setOpen = (value: boolean): void => {
    document.body.classList.toggle('nav-is-open', value);
    open.setAttribute('aria-expanded', String(value));
    if (value) close.focus(); else open.focus();
  };
  open.addEventListener('click', () => setOpen(true));
  close.addEventListener('click', () => setOpen(false));
  backdrop.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('nav-is-open')) setOpen(false);
  });
}

interface PagefindResult {
  url: string;
  meta: { title?: string };
  excerpt: string;
}

interface PagefindSearchResult {
  data: () => Promise<PagefindResult>;
}

interface PagefindModule {
  search: (query: string) => Promise<{ results: PagefindSearchResult[] }>;
}

function initSearch(): void {
  const root = document.querySelector<HTMLElement>('[data-search]');
  const dialog = root?.querySelector<HTMLDialogElement>('[data-search-dialog]');
  const open = root?.querySelector<HTMLButtonElement>('[data-search-open]');
  const input = root?.querySelector<HTMLInputElement>('[data-search-input]');
  const state = root?.querySelector<HTMLElement>('[data-search-state]');
  const list = root?.querySelector<HTMLOListElement>('[data-search-results]');
  if (!dialog || !open || !input || !state || !list) return;

  let pagefind: PagefindModule | undefined;
  let timer = 0;
  const loadPagefind = async (): Promise<PagefindModule> => {
    if (pagefind) return pagefind;
    const modulePath = `${import.meta.env.BASE_URL}pagefind/pagefind.js`;
    pagefind = await import(/* @vite-ignore */ modulePath) as PagefindModule;
    return pagefind;
  };

  open.addEventListener('click', () => {
    dialog.showModal();
    input.focus();
  });
  input.addEventListener('input', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(async () => {
      const query = input.value.trim();
      list.replaceChildren();
      if (!query) {
        state.textContent = 'キーワードを入力してください。';
        return;
      }
      state.textContent = '検索しています…';
      try {
        const engine = await loadPagefind();
        const response = await engine.search(query);
        const results = await Promise.all(response.results.slice(0, 10).map((result) => result.data()));
        if (results.length === 0) {
          state.textContent = '該当するページはありません。';
          return;
        }
        state.textContent = `${results.length}件見つかりました。`;
        for (const result of results) {
          const item = document.createElement('li');
          const link = document.createElement('a');
          const title = document.createElement('strong');
          const excerpt = document.createElement('p');
          link.href = result.url;
          title.textContent = result.meta.title ?? '教材ページ';
          excerpt.textContent = result.excerpt.replace(/<[^>]*>/g, '');
          link.append(title, excerpt);
          item.append(link);
          list.append(item);
        }
      } catch {
        state.textContent = '検索を読み込めませんでした。章一覧からページを選んでください。';
      }
    }, 180);
  });
}

function initFigures(): void {
  for (const figure of document.querySelectorAll<HTMLElement>('[data-figure]')) {
    const open = figure.querySelector<HTMLButtonElement>('[data-figure-open]');
    const close = figure.querySelector<HTMLButtonElement>('[data-figure-close]');
    const dialog = figure.querySelector<HTMLDialogElement>('[data-figure-dialog]');
    if (!open || !close || !dialog) continue;
    open.addEventListener('click', () => dialog.showModal());
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => open.focus());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  }
}

initCopyButtons();
initNavigation();
initSearch();
initFigures();
