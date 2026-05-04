const levelController = require("../controllers/level.contoller")
const express = require("express")

const router = express.Router()

router.get("/", levelController.getLevels)

module.exports = router