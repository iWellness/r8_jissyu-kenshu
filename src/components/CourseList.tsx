/** One chapter displayed on the course index. */
export interface CourseListItem {
  /** Chapter number in course order. */
  order: number;
  /** Visible chapter title. */
  title: string;
  /** Base-aware URL for the chapter. */
  href: string;
}

/** Props for the course index list. */
export interface CourseListProps {
  /** Chapters in the order learners should complete them. */
  lessons: CourseListItem[];
}

/** Renders the course sequence as simple chapter links. */
export function CourseList({ lessons }: CourseListProps) {
  return (
    <ol className="course-list">
      {lessons.map((lesson) => (
        <li key={lesson.href}>
          <a className="course-list__link" href={lesson.href}>
            <span className="course-list__number">{String(lesson.order).padStart(2, '0')}</span>
            <span>{lesson.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}
