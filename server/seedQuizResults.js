const db = require("./models/index");
const bcrypt = require("bcrypt");

const seedQuizResults = async () => {
    try {
        const mockEmails = ["alice@example.com", "bob@example.com", "charlie@example.com"];
        const existingMocks = await db.User.findAll({ where: { email: mockEmails } });
        
        if (existingMocks.length < mockEmails.length) {
            console.log("Mock users missing. Seeding them...");
            const hashedPassword = await bcrypt.hash("password123", 10);
            const mocksToCreate = [
                { name: "Alice Smith", email: "alice@example.com", password: hashedPassword },
                { name: "Bob Jones", email: "bob@example.com", password: hashedPassword },
                { name: "Charlie Brown", email: "charlie@example.com", password: hashedPassword }
            ].filter(mock => !existingMocks.some(em => em.email === mock.email));
            
            await db.User.bulkCreate(mocksToCreate);
        }

        let users = await db.User.findAll();

        const skills = await db.Skill.findAll();
        const levels = await db.Level.findAll();
        const quizResults = [];

        users.forEach(user => {
            skills.forEach(skill => {
                levels.forEach(level => {
                    const totalQuestions = 10;
                    const attemptedQuestions = Math.floor(Math.random() * 6) + 5; // 5 to 10
                    const minScore = 4;
                    const score = Math.floor(Math.random() * (attemptedQuestions - minScore + 1)) + minScore;
                    const percentage = Number(((score / totalQuestions) * 100).toFixed(2));

                    quizResults.push({
                        userId: user.id,
                        skillId: skill.id,
                        levelId: level.id,
                        score,
                        totalQuestions,
                        attemptedQuestions,
                        percentage
                    });
                });
            });
        });

        // Clear existing results
        await db.QuizResult.destroy({ where: {} });

        // Bulk insert new results
        await db.QuizResult.bulkCreate(quizResults);
        console.log("Quiz Results Seeded Successfully");

        if (require.main === module) {
            process.exit();
        }
    } catch (error) {
        console.error("Quiz results seeding error:", error);
        if (require.main === module) {
            process.exit(1);
        }
    }
};

module.exports = seedQuizResults;

if (require.main === module) {
    seedQuizResults();
}