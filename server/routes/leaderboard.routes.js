const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")

const leaderboardController =
    require("../controllers/leaderboard.controller")

const router = express.Router()

router.get(
    "/",
    authMiddleware,
    leaderboardController.getLeaderboard
)

module.exports = router