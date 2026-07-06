const contentService = require("../domain/content.service");

const getLessonScreen = async (lessonId) => {
  const lesson = await contentService.getLessonById(lessonId);

  const { exercises } = await contentService.getLessonExercises(lessonId);

  return {
    lesson: {
      ...lesson.toJSON(),
      exercises,
    },
  };
};

module.exports = { getLessonScreen };
