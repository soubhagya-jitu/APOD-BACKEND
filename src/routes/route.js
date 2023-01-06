
const express = require("express")
const router = express.Router()
let {apodImage} = require("../controllers/apodController")

router.post("/apod-image",apodImage)

module.exports = router