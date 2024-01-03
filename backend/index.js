const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBSession = require('connect-mongodb-session')(session);
const UserModel = require('./models/Users');
const bcrypt = require('bcryptjs');

const app = express();

const dbUri =  "mongodb+srv://Admin-Michael:mongoDB123@cluster0.jpdqm.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbUri)
    .then(() => {})
    .catch((error) => {console.log(error);});

const store = new MongoDBSession({
    uri: dbUri,
    collection: "userSessions",
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "key that will sign cookie",
    resave: false,
    saveUninitialized: false,
    store: store,
}));

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get("/", (req, res) => {
    req.session.isAuth = true;
    console.log(req.session);
    res.render("landing");
})

app.get("/login", (req, res) => {
    res.render("login");

})

app.post("/login", async (req, res) => {
    const {username, email, password} = req.body;

    const user = await UserModel.findOne({email});
    if(!user) {
        return(res.redirect("/register"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return(res.redirect("/login"));
    }

    req.session.isAuth = true;
    res.redirect("/dashboard");
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.post("/register", async (req, res) => {
    const {username, email, password} = req.body;
    const salt = 12;

    let user = await UserModel.findOne({email});

    if (user) {
        return(res.redirect("/register"));
    }

    const hashedPass = await bcrypt.hash(password, salt);

    user = new UserModel({
        username, 
        email, 
        password: hashedPass,
    });

    await user.save();

    res.redirect("/login");
})

app.get("/dashboard", (req, res) => {
    res.render("dashboard");
})

app.listen(5001, console.log("Server running 5001"));