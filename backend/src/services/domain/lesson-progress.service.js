const { UserLessonProgress, Lesson, CourseModule } = require("../../../models");

const getLastStudiedLesson = async (userId) => {
  return UserLessonProgress.findOne({
    where: { user_id: userId },
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
};

module.exports = {
  getLastStudiedLesson,
};
