const { Sequelize } = require('sequelize');
const path = require("path");

let sequelize;

if (process.env.DATABASE_URL) {
    // Production: Connect to PostgreSQL
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false
    });
    console.log("Connected to PostgreSQL Database");
} else {
    // Local Development: Connect to SQLite
    const dbPath = path.resolve(__dirname, "../database.sqlite");
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: dbPath,
        logging: false
    });
    console.log("Connected to SQLite Database at:", dbPath);
}

module.exports = sequelize;
