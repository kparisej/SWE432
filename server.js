require("dotenv").config();
const express = require("express");
const app = express();

app.set("view engine", "ejs");

// get our Date data model
const DateModel = require("./models/DateModel.js");
app.use(express.static("public"));
// tell node to use json and HTTP header features in body-parser
app.use(express.urlencoded({ extended: true }));

// use the route handler
const dateRouter = require("./handlers/dateRouter.js");
dateRouter.handleAllDates(app, DateModel);
dateRouter.handleSingleDate(app, DateModel);
dateRouter.handleSelectedDate(app, DateModel);
dateRouter.handleSelectedDateSongs(app, DateModel);

const songsRouter = require("./handlers/songsRouter.js");
const SongModel = require("./models/SongModel.js");
songsRouter.handleAllSongs(app, SongModel);

// create connection to database
require("./handlers/dataConnector.js").connect();

// Sets up a route to database
app.get("/", (req, res) => {
  res.render("dj_index");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server running at port == " + port);
});
