const express = require("express")
const router = express.Router()
const {getImage, createImage} = require("../controllers/imageController")

router.get("/", getImage)
router.post("/create", createImage)

module.exports = router