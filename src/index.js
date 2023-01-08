const express = require('express');
const route = require('./routes/route');
const mongoose = require('mongoose');
const app = express();
const multer = require("multer")
const cors = require("cors")

app.use(cors())
app.use(express.json());
const upload = multer();
app.use(upload.any());


mongoose.connect("mongodb+srv://manaskumar:iFVJhjYrsH7iars8@cluster0.s4pqkzd.mongodb.net/ApodProject?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then(() => console.log("MongoDb is connected"))
.catch(err => console.log(err))


app.use('/', route)


app.listen(4000, function () {
    console.log("Express app running on port 4000")
});