const lessonService = require("../services/screens/lesson.service");

const getById = async (req, res, next) => {
  try {
    const result = await lessonService.getLessonScreen(req.params.id);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { getById };
