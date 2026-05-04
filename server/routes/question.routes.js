const quizContoller = require("../controllers/question.contoller")
const express = require("express")

const router = express.Router()

router.get("/questions", quizContoller.getQuestions)

module.exports = router