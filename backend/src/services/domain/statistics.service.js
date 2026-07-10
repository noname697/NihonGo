const { Op } = require("sequelize");

const {
  CourseModule,
  Flashcard,
  FlashcardDeck,
  Lesson,
  StudyCharacter,
  UserLessonProgress,
  UserExerciseProgress,
  UserCharacterProgress,
  FlashcardReview,
} = require("../../../models");

const DAILY_GOAL_TARGET = 5;

const getStartOfToday = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

const getQuickStats = async (userId) => {
  const now = new Date();

  const reviewedRows = await FlashcardReview.findAll({
    where: {
      user_id: userId,
    },
    attributes: ["flashcard_id"],
    raw: true,
  });

  const reviewedFlashcardIds = reviewedRows.map(
    (review) => review.flashcard_id,
  );

  const [
    totalLessons,
    completedLesson,
    answeredExercises,
    correctExercises,
    masteredCharacters,
    reviewedFlashcards,
    dueReviewedFlashcards,
    newFlashcards,
    totalFlashcards,
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
    FlashcardReview.count({
      where: {
        user_id: userId,
        due_date: {
          [Op.lte]: now,
        },
      },
    }),
    Flashcard.count({
      include: [
        {
          model: FlashcardDeck,
          as: "deck",
          attributes: [],
          where: {
            user_id: userId,
          },
        },
      ],
      where:
        reviewedFlashcardIds.length > 0
          ? {
              id: {
                [Op.notIn]: reviewedFlashcardIds,
              },
            }
          : undefined,
    }),
    Flashcard.count({
      include: [
        {
          model: FlashcardDeck,
          as: "deck",
          attributes: [],
          where: {
            user_id: userId,
          },
        },
      ],
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
    reviewedFlashcards,
    dueFlashcards: dueReviewedFlashcards + newFlashcards,
    totalFlashcards,
  };
};

const getDailyGoal = async (userId) => {
  const today = getStartOfToday();

  const [lessonsStudied, charactersPracticed, flashcardsReviewed] =
    await Promise.all([
      UserLessonProgress.count({
        where: {
          user_id: userId,
          last_studied_at: {
            [Op.gte]: today,
          },
        },
      }),
      UserCharacterProgress.count({
        where: {
          user_id: userId,
          last_practiced_at: {
            [Op.gte]: today,
          },
        },
      }),
      FlashcardReview.count({
        where: {
          user_id: userId,
          last_reviewed_at: {
            [Op.gte]: today,
          },
        },
      }),
    ]);

  const completed = lessonsStudied + charactersPracticed + flashcardsReviewed;

  return {
    target: DAILY_GOAL_TARGET,
    completed,
    progress: Math.min(Math.round((completed / DAILY_GOAL_TARGET) * 100), 100),
    items: [
      {
        id: "lessons",
        label: "Lessons studied",
        value: lessonsStudied,
      },
      {
        id: "characters",
        label: "Characters practiced",
        value: charactersPracticed,
      },
      {
        id: "flashcards",
        label: "Flashcards reviewed",
        value: flashcardsReviewed,
      },
    ],
  };
};

const getRecentActivity = async (userId) => {
  const [recentLessons, recentCharacters, recentFlashcards] = await Promise.all(
    [
      UserLessonProgress.findAll({
        where: {
          user_id: userId,
          last_studied_at: {
            [Op.not]: null,
          },
        },
        include: [
          {
            model: Lesson,
            as: "lesson",
            attributes: ["id", "title"],
            include: [
              {
                model: CourseModule,
                as: "module",
                attributes: ["level"],
              },
            ],
          },
        ],
        order: [["last_studied_at", "DESC"]],
        limit: 5,
      }),
      UserCharacterProgress.findAll({
        where: {
          user_id: userId,
          last_practiced_at: {
            [Op.not]: null,
          },
        },
        include: [
          {
            model: StudyCharacter,
            as: "character",
            attributes: ["id", "symbol", "romaji", "meaning", "type"],
          },
        ],
        order: [["last_practiced_at", "DESC"]],
        limit: 5,
      }),
      FlashcardReview.findAll({
        where: {
          user_id: userId,
          last_reviewed_at: {
            [Op.not]: null,
          },
        },
        include: [
          {
            model: Flashcard,
            as: "flashcard",
            attributes: ["id", "front_text", "deck_id"],
            include: [
              {
                model: FlashcardDeck,
                as: "deck",
                attributes: ["title"],
              },
            ],
          },
        ],
        order: [["last_reviewed_at", "DESC"]],
        limit: 5,
      }),
    ],
  );

  const activities = [
    ...recentLessons.map((progress) => {
      return {
        id: `lesson-${progress.lesson_id}`,
        type: "lesson",
        label: "Lesson",
        title: progress.lesson.title,
        detail: `${progress.lesson.module.level} - ${Math.round(progress.score)}% score`,
        occurredAt: progress.last_studied_at,
        action: `/lessons/${progress.lesson_id}`,
      };
    }),
    ...recentCharacters.map((progress) => {
      const character = progress.character;

      return {
        id: `character-${progress.character_id}`,
        type: "character",
        label: "Trainer",
        title: character.symbol,
        detail:
          character.romaji || character.meaning || `${character.type} practice`,
        occurredAt: progress.last_practiced_at,
        action: `/trainer`,
      };
    }),
    ...recentFlashcards.map((progress) => {
      return {
        id: `flashcard-${progress.flashcard_id}`,
        type: "flashcard",
        label: "Flashcard",
        title: progress.flashcard.front_text,
        detail: progress.flashcard.deck.title,
        occurredAt: progress.last_reviewed_at,
        action: `/flashcards`,
      };
    }),
  ];

  return activities
    .sort((first, second) => {
      return new Date(second.occurredAt) - new Date(first.occurredAt);
    })
    .slice(0, 5);
};

module.exports = {
  getQuickStats,
  getDailyGoal,
  getRecentActivity,
};
