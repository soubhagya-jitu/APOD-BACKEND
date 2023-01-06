let axios = require("axios")
let apodModel = require("../models/apodModel")

let apodImage = async function (req, res) {
    try {
        res.setHeader('Access-Control-Allow-Origin','*')
        let date = req.body.date
        if (!date) {
            function convertTZ(date, tzString) {
                return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
            }
            date=new Date()
            date = convertTZ(date, "America/New_York")
            var year = date.toLocaleString("default", { year: "numeric" });
            var month = date.toLocaleString("default", { month: "2-digit" });
            var day = date.toLocaleString("default", { day: "2-digit" });
            date = year + "-" + month + "-" + day
        }
        if (date) {
            if (!(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(date))) {
                return res.status(400).send({ status: false, message: "Enter a valid date in this format yyyy-mm-dd" })
            }
        }
        let findImage = await apodModel.findOne({ date: date }).select({ copyright: 1, date: 1, explanation: 1, hdurl: 1, media_type: 1, service_version: 1, title: 1, url: 1, _id: 0 })
        if (findImage) {
            return res.status(200).send({ status: true, data: findImage })
        }
        let options = {
            method: "get",
            url: `https://api.nasa.gov/planetary/apod?api_key=8G0GNfFlRVtkuMhq3nfzH9bbxwhNLGjGDvmHXO2V&date=${date}`
        }
        let error = false
        let result = await axios(options)
            .catch((err) => {
                error = true
            })
        if (error) {
            return res.status(400).send({ status: false, message: "Date should be inbetween 1995-06-16 to till today" })
        }

        await apodModel.create(result.data)
        return res.status(200).send({ status: true, data: result.data })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { apodImage }