// services/screens/dashboard/dashboard.service.js

const lessonProgressService = require("../../domain/lesson-progress.service");
const dashboardPresenter = require("./dashboard.presenter");
const statisticsService = require("../../domain/statistics.service");
const recommendationService = require("../../domain/recommendation.service");

const getDashboard = async (userId) => {
  const [lastLesson, quickStats, recommendation] = await Promise.all([
    lessonProgressService.getLastStudiedLesson(userId),
    statisticsService.getQuickStats(userId),
    recommendationService.getRecommendation(userId),
  ]);

  return dashboardPresenter.build({
    lastLesson,
    quickStats,
    recommendation,
  });
};

module.exports = {
  getDashboard,
};
