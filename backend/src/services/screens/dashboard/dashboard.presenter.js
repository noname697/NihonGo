const build = ({
  lastLesson,
  quickStats,
  dailyGoal,
  recentActivity,
  recommendation,
}) => {
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
        value: quickStats.reviewedFlashcards,
        icon: "cards",
      },
      {
        id: "due-flashcards",
        label: "Cards Due",
        value: quickStats.dueFlashcards,
        icon: "clock",
      },
    ],
    dailyGoal,
    recentActivity,
    recommendation,
  };
};

module.exports = {
  build,
};
