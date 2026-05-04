const questionService = require("../services/question.service")

exports.getQuestions = async (req, res) => {
    try {
        const questions = await questionService.getQuestions(req.query)

        res.status(200).json({
            success: true,
            message: "fetched question successfully",
            data: questions
        })
    } catch (err) {
        console.log(err)
        res.status(err.status || 500).json({
            success: false,
            message: err.expose ? err.message : "Internal Server Error",
        });
    }
}