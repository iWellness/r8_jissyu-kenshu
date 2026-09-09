import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

/** One chapter displayed on the course index. */
export interface CourseListItem {
  /** Chapter number in course order. */
  order: number;
  /** Visible chapter title. */
  title: string;
  /** Short explanation of the chapter. */
  description: string;
  /** Base-aware URL for the chapter. */
  href: string;
}

/** Props for the course index list. */
export interface CourseListProps {
  /** Chapters in the order learners should complete them. */
  lessons: CourseListItem[];
}

/** Renders the course sequence as accessible, fully clickable cards. */
export function CourseList({ lessons }: CourseListProps) {
  return (
    <ol className="course-list">
      {lessons.map((lesson) => (
        <li key={lesson.href}>
          <Card size="sm" className="course-card">
            <a className="course-card__link" href={lesson.href}>
              <CardHeader>
                <Badge variant="secondary">
                  Lesson {String(lesson.order).padStart(2, '0')}
                </Badge>
                <CardTitle>
                  <h2>{lesson.title}</h2>
                </CardTitle>
                <CardDescription>{lesson.description}</CardDescription>
                <CardAction aria-hidden="true">→</CardAction>
              </CardHeader>
            </a>
          </Card>
        </li>
      ))}
    </ol>
  );
}
