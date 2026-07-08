const { Op } = require("sequelize");

const { Lesson, UserLessonProgress, CourseModule } = require("../../../models");

const getRecommendation = async (userId) => {
  const lastLesson = await UserLessonProgress.findOne({
    where: { user_id: userId, is_completed: false },
    include: [
      {
        model: Lesson,
        as: "lesson",
        include: [
          {
            model: CourseModule,
            as: "module",
          },
        ],
      },
    ],
    order: [["last_studied_at", "DESC"]],
  });

  if (lastLesson) {
    return {
      type: "lesson",
      title: `Continue ${lastLesson.lesson.title}`,
      description: "Resume where you left off",
      lessonId: lastLesson.lesson.id,
      action: `/lessons/${lastLesson.lesson.id}`,
    };
  }

  const studiedLessons = await UserLessonProgress.findAll({
    where: { user_id: userId },
    attributes: ["lesson_id"],
  });

  const studiedIds = studiedLessons.map((lesson) => lesson.lesson_id);

  const nextLesson = await Lesson.findOne({
    where: {
      id: {
        [Op.notIn]: studiedIds,
      },
    },
    include: [
      {
        model: CourseModule,
        as: "module",
      },
    ],
    order: [
      [
        {
          model: CourseModule,
          as: "module",
        },
        "position",
        "ASC",
      ],
      ["position", "ASC"],
    ],
  });

  if (nextLesson) {
    return {
      type: "lesson",
      title: `Start ${nextLesson.title}`,
      description: "Continue your Japanese journey.",
      lessonId: nextLesson.id,
      action: `/lessons/${nextLesson.id}`,
    };
  }

  return null;
};

module.exports = { getRecommendation };
