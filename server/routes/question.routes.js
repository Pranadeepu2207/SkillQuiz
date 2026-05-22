const quizContoller = require("../controllers/question.contoller")
const authMiddleware = require("../middlewares/auth.middleware")
const express = require("express")

const router = express.Router()

router.get("/questions", authMiddleware, quizContoller.getQuestions)

module.exports = router