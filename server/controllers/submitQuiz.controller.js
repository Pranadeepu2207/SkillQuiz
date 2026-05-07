const submitQuizService = require("../services/submitQuiz.service")

exports.submitQuiz = async (req, res) => {

    try {
        const { skillId, levelId, answers } = req.body
        console.log("from submit quiz controller", skillId, levelId, answers)
        const result = await submitQuizService.submitQuiz({skillId, levelId, answers})

        return res.status(200).json({
            success: true,
            message: "Quiz evaluated successfully",
            data: result
        });

    } catch (err) {
        console.log(err)
        res.status(err.status || 500).json({
            success: false,
            message: err.expose ? err.message : "Internal Server Error",
        });
    }
}