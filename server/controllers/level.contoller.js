const levelService = require("../services/level.service")

exports.getLevels = async (req, res) => {
    try {
        const levels = await levelService.getLevels()

        res.status(200).json({
            success: true,
            message: "fetched levels succesfully",
            data: levels
        })
    } catch (err) {
        console.log(err)
        res.status(err.status || 500).json({
            success: false,
            message: err.expose ? err.message : "Internal Server Error",
        });
    }
}