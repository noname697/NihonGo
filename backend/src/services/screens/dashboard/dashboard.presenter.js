const build = ({ lastLesson }) => {
  if (!lastLesson) {
    return {
      continueLearning: null,
    };
  }

  return {
    continueLearning: {
      lessonId: lastLesson.lesson.id,
      module: lastLesson.lesson.module.level,
      title: lastLesson.lesson.title,
      progress: Math.round(lastLesson.score),
      completed: lastLesson.is_completed,
    },
  };
};

module.exports = {
  build,
};
