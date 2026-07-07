const express = require("express");

const dashboardController = require("../controllers/dashboard.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/summary", dashboardController.getSummary);
router.get("/v2", dashboardController.getV2);

module.exports = router;
