const { Op } = require("sequelize");

const {
  Lesson,
  UserLessonProgress,
  UserExerciseProgress,
  UserCharacterProgress,
  FlashcardReview,
} = require("../../../models");

const getQuickStats = async (userId) => {
  const [
    totalLessons,
    completedLesson,
    answeredExercises,
    correctExercises,
    masteredCharacters,
    dueFlashcards,
  ] = await Promise.all([
    Lesson.count(),
    UserLessonProgress.count({
      where: {
        user_id: userId,
        is_completed: true,
      },
    }),
    UserExerciseProgress.count({
      where: {
        user_id: userId,
      },
    }),
    UserExerciseProgress.count({
      where: {
        user_id: userId,
        is_correct: true,
      },
    }),
    UserCharacterProgress.count({
      where: {
        user_id: userId,
        mastery_score: {
          [Op.gte]: 80,
        },
      },
    }),
    FlashcardReview.count({
      where: {
        user_id: userId,
      },
    }),
  ]);

  return {
    completedLesson,
    totalLessons,
    accuracy:
      answeredExercises === 0
        ? 0
        : Math.round((correctExercises / answeredExercises) * 100),
    masteredCharacters,
    dueFlashcards,
  };
};

module.exports = { getQuickStats };
