const express = require("express")
const lessonController = require("../controllers/lesson.controller")

const router = express.Router()

router.get("/:id", lessonController.getById)

module.exports = router