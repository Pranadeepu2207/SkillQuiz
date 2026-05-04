const { Skill } = require("../models/index")
const createError = require('http-errors')

exports.getSkills = async () => {
    const skills = await Skill.findAll(({
        attributes: ["id", "name"]
    }))

    if (!skills.length) {
        throw createError(404, "No Skills Found")
    }

    return skills
}