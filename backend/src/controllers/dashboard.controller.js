const dashboardService = require("../services/screens/dashboard/dashboard.service");

const getSummary = async (req, res, next) => {
  try {
    const dashboard = await dashboardService.getDashboard(req.user.id);

    return res.status(200).json({
      dashboard,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSummary,
};
