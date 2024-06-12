const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const app = express();
const path = require("path");
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");

//log requests
app.use(morgan("tiny"));
mongoose.connect("Your Db link");
//parser request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));
//set view engine
app.set("view engine", "ejs");
//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

app.get("/", (req, res) => {
  res.render("index");
});
app.use("/", require("./server/routes/router"));
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
