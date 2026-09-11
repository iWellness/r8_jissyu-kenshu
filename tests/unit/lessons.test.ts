import { describe, expect, it } from 'vitest';
import { sortAndValidateLessons, type LessonEntry } from '../../src/lib/lessons';

function lesson(slug: string, order: number): LessonEntry {
  return { data: { slug, order } } as LessonEntry;
}

describe('sortAndValidateLessons', () => {
  it('sorts the navigation by explicit lesson order', () => {
    expect(sortAndValidateLessons([lesson('second', 2), lesson('first', 1)]).map((entry) => entry.data.slug)).toEqual(['first', 'second']);
  });

  it('rejects duplicate slugs and orders', () => {
    expect(() => sortAndValidateLessons([lesson('same', 1), lesson('same', 2)])).toThrow('Duplicate lesson slug');
    expect(() => sortAndValidateLessons([lesson('first', 1), lesson('second', 1)])).toThrow('Duplicate lesson order');
  });
});
