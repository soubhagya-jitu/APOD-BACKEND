
const express = require("express")
const router = express.Router()
let {getApodImage} = require("../controllers/apodController")

router.post("/apod-image",getApodImage)

module.exports = router