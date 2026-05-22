const submitQuizController = require("../controllers/submitQuiz.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const express = require("express")
const router = express.Router()

router.post("/", authMiddleware, submitQuizController.submitQuiz)

module.exports = router