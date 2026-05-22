const { Question, QuizResult } = require("../models/index");
const createError = require("http-errors");

exports.submitQuiz = async ({ skillId, levelId, userId, answers }) => {
    console.log("from submit quiz service", skillId, levelId, userId);

    if (!skillId || !levelId) {
        throw createError(400, "SkillId and LevelId are required");
    }

    const allQuestions = await Question.findAll({
        where: { skillId, levelId },
    });

    if (!allQuestions.length) {
        throw createError(404, "No questions found for this skill & level");
    }

    const answerMap = {};

    answers.forEach((answer) => {
        answerMap[answer.questionId] = answer.selectedOption;
    });

    let score = 0;
    let attempted = 0;

    const unanswered = [];
    const incorrect = [];

    allQuestions.forEach((question) => {
        const selectedOption = answerMap[question.id];

        if (selectedOption === undefined) {
            unanswered.push({
                questionId: question.id,
                question: question.question,
                options: question.options,
                correctAnswer: question.correctAnswer,
            });
        } else {
            attempted += 1;

            if (question.correctAnswer == selectedOption) {
                score += 1;
            } else {
                incorrect.push({
                    questionId: question.id,
                    question: question.question,
                    options: question.options,
                    correctAnswer: question.correctAnswer,
                    selectedAnswer: selectedOption,
                });
            }
        }
    });

    const percentage = Number(((score / allQuestions.length) * 100).toFixed(2));

    const existingResult = await QuizResult.findOne({
        where: {
            userId,
            skillId,
            levelId,
        },
    });

    if (!existingResult) {
        // console.log("existingResults :", existingResults)
        await QuizResult.create({
            userId,

            skillId,

            levelId,

            score,

            totalQuestions: allQuestions.length,

            attemptedQuestions: attempted,

            percentage,
        });
    } else {
        if (score > existingResult.score) {
            existingResult.score = score;

            existingResult.totalQuestions = allQuestions.length;

            existingResult.attemptedQuestions = attempted;

            existingResult.percentage = percentage;

            await existingResult.save();
        }
    }

    return {
        total: allQuestions.length,
        attemptedQuestions: attempted,
        score,
        unanswered,
        incorrect,
    };
};
