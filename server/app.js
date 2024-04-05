const express = require("express");
const cors = require("cors");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const {baseRoute}=require("../server/utils/baseRoute")
const app = express();


app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(baseRoute + "/auth", require("./routes/userRouter"));
app.use(baseRoute + "/product", require("./routes/productRoute"));
// app.use(baseRoute + "/submit", require("./routes/submitRoute"));

module.exports = app;