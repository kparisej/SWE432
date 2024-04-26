require("dotenv").config();
const express = require("express");
const app = express();

app.set("view engine", "ejs");

// Get Date and Song data models
const DateModel = require("./models/DateModel.js");
const SongModel = require("./models/SongModel.js");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// use the route handlers for dates and songs
const dateRouter = require("./handlers/dateRouter.js");
const songsRouter = require("./handlers/songsRouter.js");

dateRouter.handleAllDates(app, DateModel);
dateRouter.handleSingleDate(app, DateModel);
dateRouter.handleSelectedDate(app, DateModel);
dateRouter.handleInsertSong(app, DateModel);

songsRouter.handleAllSongs(app, SongModel);

// create connection to database
require("./handlers/dataConnector.js").connect();

// Assume you have an endpoint for adding a song to the DJList
app.post("/api/add-song", async (req, res) => {
  const { songTitle, artist, genre, selectedDate, startTime, endTime } =
    req.body;

  try {
    // Retrieve document corresponding to the selected date from the database
    const dateDocument = await DateModel.findOne({ date: selectedDate });

    // Find the time slot within that document that matches the provided start time and end time
    const timeSlot = dateDocument.timeSlots.find(
      (slot) => slot.startTime === startTime && slot.endTime === endTime
    );

    if (!timeSlot) {
      throw new Error("Time slot not found");
    }

    // Add the new song to the DJList array within that time slot
    timeSlot.djList.push({ songName: songTitle, artist, genre });

    // Save the updated document back to the database
    await dateDocument.save();

    res.status(200).send("Song added to DJList successfully");
  } catch (error) {
    console.error("Error adding song to DJList:", error);
    res.status(500).send("Failed to add song to DJList");
  }
});

// Sets up a route to database
app.get("/", (req, res) => {
  res.render("dj_index");
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server running at port == " + port);
});
