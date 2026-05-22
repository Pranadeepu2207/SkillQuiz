const levelController = require("../controllers/level.contoller")
const authMiddleware = require("../middlewares/auth.middleware")
const express = require("express")

const router = express.Router()

router.get("/", authMiddleware, levelController.getLevels)

module.exports = router