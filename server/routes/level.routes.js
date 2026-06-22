const levelController = require("../controllers/level.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const express = require("express")

const router = express.Router()

router.get("/", authMiddleware, levelController.getLevels)

module.exports = router