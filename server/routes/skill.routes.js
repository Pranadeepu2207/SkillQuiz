const skillController = require("../controllers/skill.contoller")
const express = require("express")

const router = express.Router()

router.get("/", skillController.getSkills)

module.exports = router