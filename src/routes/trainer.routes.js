const express = require("express");

const trainerController = require("../controllers/trainer.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/characters", trainerController.listCharacters);
router.get("/characters/random", trainerController.listRandomCharacters);

router.post(
  "/characters/:id/answer",
  authMiddleware,
  trainerController.answerCharacter,
);

router.get("/progress", authMiddleware, trainerController.showTrainerProgress);

module.exports = router;
