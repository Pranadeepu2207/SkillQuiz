const submitQuizController = require("../controllers/submitQuiz.controller")

const express = require("express")
const router = express.Router

router.post("/", submitQuizController.submitQuiz)

module.exports = router