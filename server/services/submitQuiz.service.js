const { Question } = require("../models/index");
const createError = require("http-errors")

exports.submitQuiz = async ({ skillId, levelId, answers }) => {

    console.log("from submit quiz service", skillId, levelId)

    if (!skillId || !levelId) {
        throw createError(400, "SkillId and LevelId are required")
    }

    const allQuestions = await Question.findAll({
        where: { skillId, levelId }
    })

    if (!allQuestions.length) {
        throw createError(404, "No questions found for this skill & level");
    }

    const answerMap = {}

    answers.forEach(answer => {
        answerMap[answer.questionId] = answer.selectedOption
    })

    let score = 0
    let attempted = 0

    const unanswered = []
    const incorrect = []

    allQuestions.forEach(question => {
        const selectedOption = answerMap[question.id]

        if (selectedOption === undefined) {
            unanswered.push({
                questionId: q.id,
                question: q.question,
                options: q.options,
                correctAnswer: q.correctAnswer
            })
        } else {
            attempted += 1

            if (question.correctAnswer == selectedOption) {
                score += 1
            } else {
                incorrect.push({
                    questionId: question.id,
                    question: question.question,
                    options: question.options,
                    correctAnswer: question.correctAnswer,
                    selectedAnswer: selectedOption
                })
            }
        }
    })

    return {
        total: allQuestions.length,
        attemptedQuestions: attempted,
        score,
        unanswered,
        incorrect
    }

}