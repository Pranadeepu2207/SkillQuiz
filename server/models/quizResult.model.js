const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const QuizResult = sequelize.define("QuizResult", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    totalQuestions: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    attemptedQuestions: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    percentage: {
        type: DataTypes.FLOAT,
        allowNull: false
    }

})

module.exports = QuizResult