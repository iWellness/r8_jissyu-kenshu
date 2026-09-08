import type { CollectionEntry } from 'astro:content';

export type LessonEntry = CollectionEntry<'lessons'>;

/** Sort lessons and reject duplicate public slugs or navigation positions. */
export function sortAndValidateLessons(lessons: LessonEntry[]): LessonEntry[] {
  const slugs = new Set<string>();
  const orders = new Set<number>();

  for (const lesson of lessons) {
    if (slugs.has(lesson.data.slug)) throw new Error(`Duplicate lesson slug: ${lesson.data.slug}`);
    if (orders.has(lesson.data.order)) throw new Error(`Duplicate lesson order: ${lesson.data.order}`);
    slugs.add(lesson.data.slug);
    orders.add(lesson.data.order);
  }

  return [...lessons].sort((a, b) => a.data.order - b.data.order);
}

/** Build a site-root-relative URL that respects the GitHub Pages base path. */
export function sitePath(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const suffix = path.replace(/^\//, '');
  return suffix ? `${base}/${suffix}` : `${base}/`;
}
