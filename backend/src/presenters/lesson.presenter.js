const buildLesson = ({
  lesson,
  exercises,
  lessonProgress,
  exerciseProgress,
}) => {
  const answersMap = new Map(
    exerciseProgress.map((progress) => [progress.exercise_id, progress]),
  );

  return {
    lesson: {
      ...lesson.toJSON(),

      progress: lessonProgress,

      exercises: exercises.map((exercise) => ({
        ...exercise.toJSON(),

        user_answer: answersMap.get(exercise.id) ?? null,
      })),
    },
  };
};

module.exports = {
  buildLesson,
};
