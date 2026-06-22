const {
    QuizResult,
    User,
    Skill,
    Level
} = require("../models")

const createError = require("http-errors")

exports.getLeaderboard = async ({
    skillId,
    levelId
}) => {

    if (!skillId || !levelId) {

        throw createError(
            400,
            "SkillId and LevelId are required"
        )

    }

    const aliceUser = await User.findOne({ where: { email: "alice@example.com" } });
    const hasAliceResults = aliceUser ? await QuizResult.findOne({ where: { userId: aliceUser.id } }) : null;
    if (!hasAliceResults) {
        console.log("Mock quiz results missing. Seeding on-demand...");
        try {
            const seedQuizResults = require("../seedQuizResults");
            await seedQuizResults();
        } catch (seedErr) {
            console.error("On-demand seeding failed:", seedErr);
        }
    }

    const skillExists = await Skill.findByPk(skillId)

    if (!skillExists) {

        throw createError(
            404,
            "Skill Not Found"
        )

    }

    const levelExists = await Level.findByPk(levelId)

    if (!levelExists) {

        throw createError(
            404,
            "Level Not Found"
        )

    }

    const leaderboard =
        await QuizResult.findAll({

            where: {
                skillId,
                levelId
            },

            include: [

                {
                    model: User,
                    attributes: ["id", "name"]
                },

                {
                    model: Skill,
                    attributes: ["name"]
                },

                {
                    model: Level,
                    attributes: ["name"]
                }

            ],

            order: [

                ["score", "DESC"],
                ["percentage", "DESC"]

            ]

        })

    if (!leaderboard.length) {

        throw createError(
            404,
            "No Leaderboard Results Found"
        )

    }

    return leaderboard

}