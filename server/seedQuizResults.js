const db = require("./models/index")

const seedQuizResults = async () => {

    try {

        const users = await db.User.findAll()

        const skills = await db.Skill.findAll()

        const levels = await db.Level.findAll()

        const quizResults = []

        users.forEach(user => {

            skills.forEach(skill => {

                levels.forEach(level => {

                    const totalQuestions = 10

                    const attemptedQuestions =
                        Math.floor(Math.random() * 6) + 5

                    const minScore = 5

                    const score =
                        Math.floor(
                            Math.random() *
                            (attemptedQuestions - minScore + 1)
                        ) + minScore

                    const percentage = Number(
                        ((score / totalQuestions) * 100).toFixed(2)
                    )

                    quizResults.push({

                        userId: user.id,

                        skillId: skill.id,

                        levelId: level.id,

                        score,

                        totalQuestions,

                        attemptedQuestions,

                        percentage

                    })

                })

            })

        })

        await db.QuizResult.destroy({
            where: {}
        })

        await db.QuizResult.bulkCreate(quizResults)

        console.log("Quiz Results Seeded Successfully")

        process.exit()

    } catch (error) {

        console.log(error)

    }

}

seedQuizResults()