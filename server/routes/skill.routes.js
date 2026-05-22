const skillController = require("../controllers/skill.contoller")
const authMiddleware = require("../middlewares/auth.middleware")
const express = require("express")

const router = express.Router()

router.get("/", authMiddleware, skillController.getSkills)

module.exports = router