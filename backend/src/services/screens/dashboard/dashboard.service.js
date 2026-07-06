const lessonProgressService = require("../../domain/lesson-progress.service");
const dashboardPresenter = require("./dashboard.presenter");

const getDashboard = async (userId) => {
  const lastLesson = await lessonProgressService.getLastStudiedLesson(userId);

  return dashboardPresenter.build({
    lastLesson,
  });
};

module.exports = {
  getDashboard,
};
