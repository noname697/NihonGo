const lessonProgressService = require("../../domain/lesson-progress.service");
const dashboardPresenter = require("./dashboard.presenter");
const statisticsService = require("../../domain/statistics.service");
const recommendationService = require("../../domain/recommendation.service");

const getDashboard = async (userId) => {
  const [lastLesson, quickStats, dailyGoal, recentActivity, recommendation] =
    await Promise.all([
      lessonProgressService.getLastStudiedLesson(userId),
      statisticsService.getQuickStats(userId),
      statisticsService.getDailyGoal(userId),
      statisticsService.getRecentActivity(userId),
      recommendationService.getRecommendation(userId),
    ]);

  return dashboardPresenter.build({
    lastLesson,
    quickStats,
    dailyGoal,
    recentActivity,
    recommendation,
  });
};

module.exports = {
  getDashboard,
};
