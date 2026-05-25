const leaderboardService =
    require("../services/leaderboard.service")

exports.getLeaderboard = async (req, res) => {

    try {

        const { skillId, levelId } = req.query

        const leaderboard =
            await leaderboardService.getLeaderboard({
                skillId,
                levelId
            })

        return res.status(200).json({

            success: true,
            message: "Leaderboard fetched successfully",
            data: leaderboard

        })

    } catch (err) {

        console.log(err)

        return res.status(err.status || 500).json({

            success: false,

            message:
                err.expose
                    ? err.message
                    : "Internal Server Error"

        })

    }

}