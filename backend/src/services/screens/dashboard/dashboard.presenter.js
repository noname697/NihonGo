const build = ({ lastLesson, quickStats }) => {
  return {
    continueLearning: lastLesson
      ? {
          lessonId: lastLesson.lesson.id,
          module: lastLesson.lesson.module.level,
          title: lastLesson.lesson.title,
          progress: Math.round(lastLesson.score),
          completed: lastLesson.is_completed,
        }
      : null,
    quickStats: [
      {
        id: "lessons",
        label: "Lessons Completed",
        value: `${quickStats.completedLesson} / ${quickStats.totalLessons}`,
        icon: "book-open",
      },
      {
        id: "accuracy",
        label: "Exercise Accuracy",
        value: `${quickStats.accuracy}%`,
        icon: "target",
      },
      {
        id: "characters",
        label: "Characters Mastered",
        value: quickStats.masteredCharacters,
        icon: "languages",
      },
      {
        id: "flashcards",
        label: "Flashcards Reviewed",
        value: quickStats.dueFlashcards,
        icon: "cards",
      },
    ],
  };
};

module.exports = {
  build,
};
