const { DataTypes } = require('sequelize')
const sequelize = require("../config/db")

const Level = sequelize.define("Level", {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
})

module.exports = Level