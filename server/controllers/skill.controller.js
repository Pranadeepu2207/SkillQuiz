const skillService = require("../services/skill.service")

exports.getSkills = async (req, res) => {
    try {
        const skills = await skillService.getSkills()

        res.status(200).json({
            success: true,
            message: "fetched skills succesfully",
            data: skills
        })
    } catch (err) {
        console.log(err)
        res.status(err.status || 500).json({
            success: false,
            message: err.expose ? err.message : "Internal Server Error",
        });
    }
}