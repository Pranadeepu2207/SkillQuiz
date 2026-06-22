const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./models/index");

const app = express();

app.use(cors());
app.use(express.json());

db.sequelize.sync().then(async () => {
    console.log("Database synced");
    try {
        const skillCount = await db.Skill.count();
        if (skillCount === 0) {
            console.log("Database is empty. Seeding skills and questions...");
            const seed = require("./seeder");
            await seed();
        }
    } catch (error) {
        console.error("Auto-seeding checking failed:", error);
    }
}).catch((err) => console.log("Database sync error:", err));
// .then(() => {
//     console.log("Database synced");
//     app.listen(3000, () => console.log("Server running"));
// })
// .catch((err) => console.log(err));

app.use("/user", require("./routes/auth.routes"));
app.use("/skills", require("./routes/skill.routes"));
app.use("/levels", require("./routes/level.routes"));
app.use("/quiz", require("./routes/question.routes"));
app.use("/submit-quiz", require("./routes/submitQuiz.route"));
app.use("/leaderboard", require("./routes/leaderboard.routes"));

module.exports = app;
