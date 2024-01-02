const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

app.get("/api", (req, res) => {
    res.json({"response": "test"});
})

app.post("/api", (req, res) => {
    let reqBody = req.body;
    let data = reqBody.data;
    console.log(data);

    res.cookie('session_id', '123');
})

app.listen(5001, () => {
    console.log("server started port 5001");
})