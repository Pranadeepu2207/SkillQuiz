const sequelize = require("../config/db");
const User = require("./user.model");
const Skill = require("./skill.model")
const Level = require("./level.model")
const Question = require("./question.model")
const QuizResult = require("./quizResult.model")

const db = {}
db.sequelize = sequelize
db.User = User
db.Skill = Skill
db.Level = Level
db.Question = Question
db.QuizResult = QuizResult

db.Skill.hasMany(db.Question, { foreignKey: "skillId", onDelete: "CASCADE" })
db.Question.belongsTo(db.Skill, { foreignKey: "skillId" })

db.Level.hasMany(db.Question, { foreignKey: "levelId", onDelete: "CASCADE" })
db.Question.belongsTo(db.Level, { foreignKey: "levelId" })

db.User.hasMany(db.QuizResult, {
    foreignKey: "userId",
    onDelete: "CASCADE"
})

db.QuizResult.belongsTo(db.User, {
    foreignKey: "userId"
})

db.Skill.hasMany(db.QuizResult, {
    foreignKey: "skillId",
    onDelete: "CASCADE"
})

db.QuizResult.belongsTo(db.Skill, {
    foreignKey: "skillId"
})

db.Level.hasMany(db.QuizResult, {
    foreignKey: "levelId",
    onDelete: "CASCADE"
})

db.QuizResult.belongsTo(db.Level, {
    foreignKey: "levelId"
})

module.exports = db