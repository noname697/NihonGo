const lessonProgressService = require("../../domain/lesson-progress.service");
const dashboardPresenter = require("./dashboard.presenter");
const statisticsService = require("../../domain/statistics.service");

const getDashboard = async (userId) => {
  const [lastLesson, quickStats] = await Promise.all([
    lessonProgressService.getLastStudiedLesson(userId),
    statisticsService.getQuickStats(userId),
  ]);

  return dashboardPresenter.build({
    lastLesson,
    quickStats,
  });
};

module.exports = {
  getDashboard,
};
