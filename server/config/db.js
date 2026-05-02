const { Sequelize } = require('sequelize')
const path = require("path");

const dbPath = path.resolve(__dirname, "../database.sqlite");
console.log("ACTUAL DB PATH:", dbPath);

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
})

module.exports = sequelize