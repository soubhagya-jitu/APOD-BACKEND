
const mongoose = require("mongoose")

let apodSchema = new mongoose.Schema({
    copyright: String,
    date: String,
    explanation: String,
    hdurl: String,
    media_type: String,
    service_version: String,
    title: String,
    url: String
}, { timestamps: true })

module.exports = mongoose.model("apoddoc", apodSchema)