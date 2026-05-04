const { Level } = require("../models/index")
const createError = require('http-errors')

exports.getLevels = async () => {
    const levels = await Level.findAll({
        attributes: ["id", "name"]
    })

    if (!levels.length) {
        throw createError(404, "No Levels Found")
    }

    return levels
}