require("dotenv").config()

console.log("PORT:", JSON.stringify(process.env.PORT))
console.log("JWT_SECRET:", JSON.stringify(process.env.JWT_SECRET))