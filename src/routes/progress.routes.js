const express = require("express");

const progressController = require("../controllers/progress.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/exercises/:id/answer", progressController.answerExercise);

router.get("/lessons/:id", progressController.showLessonProgress);
router.get("/modules/:id", progressController.showModuleProgress);
router.get("/overview", progressController.showOverallProgress);

module.exports = router;
