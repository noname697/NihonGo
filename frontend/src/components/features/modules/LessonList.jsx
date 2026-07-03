import { EmptyState } from "../../ui/EmptyState";
import { LessonCard } from "./LessonCard";

export const LessonList = ({ lessons }) => {
  if (!lessons || lessons.length === 0) {
    return (
      <EmptyState
        title="No lessons yet"
        description="This module does not have lessons available yet."
      />
    );
  }

  return (
    <div className="grid gap-4">
      {lessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
};
