const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Question = sequelize.define("Question", {
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },

    options: {
        type: DataTypes.JSON,
        allowNull: false
    },

    correctAnswer: {
        type: DataTypes.STRING,
        allowNull: false
    },

    skillId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    levelId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Question;