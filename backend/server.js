const express = require('express');
const bodyParser = require('body-parser');

//import questions, { answers } from "../database/data.js";

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/api", (req, res) => {
    res.json({"response": "test"});
})

app.post("/api", (req, res) => {
    let reqBody = req.body;
    let data = reqBody.data;
    console.log(data);
})

app.listen(5001, () => {
    console.log("server started port 5001");
})