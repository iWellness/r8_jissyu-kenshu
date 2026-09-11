/** Normalize an imported command snippet without changing meaningful whitespace. */
export function normalizeSnippet(source: string): string {
  return source.replace(/\r\n?/g, '\n').replace(/\n$/, '');
}
