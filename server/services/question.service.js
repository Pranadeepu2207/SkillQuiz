const { Question, Skill, Level } = require("../models/index")
const createError = require("http-errors")

exports.getQuestions = async ({ skillId, levelId }) => {

    console.log(`from questions service skillId = ${skillId}, levelId = ${levelId}`)

    if (!skillId || !levelId) {
        throw createError(400, "skillId and levelId are required");
    }

    const questions = await Question.findAll({
        where: { skillId, levelId },
        attributes: ["id", "question", "options"],
        include: [
            { model: Skill, attributes: ["name"] },
            { model: Level, attributes: ["name"] }
        ]
    })

    console.log("from ques service:", questions)

    if (!questions.length) {
        throw createError(404, "No Questions Found");
    }

    return questions
}