const DateModel = require("../models/DateModel");
const SongModel = require("../models/SongModel");

// handle GET requests for /api/dates - return all dates
const handleAllDates = (app) => {
  app.get("/api/dates", (req, resp) => {
    // use mongoose to retrieve all dates from Mongo
    DateModel.find()
      .then((data) => {
        resp.json(data);
      })
      .catch((err) => {
        resp.json({ message: "Unable to connect to dates" });
      });
  });
};

const handleSingleDate = (app) => {
  app.get("/api/dates/:date", (req, resp) => {
    DateModel.find({ date: req.params.date })
      .then((data) => {
        resp.json(data);
      })
      .catch((err) => {
        resp.json({ message: "Unable to connect to dates" });
      });
  });
};

const handleSelectedDate = (app) => {
  app.get("/api/dates/:date", async (req, res) => {
    const selectedDate = req.params.date;
    try {
      const data = await DateModel.find({ date: selectedDate });
      if (!data) {
        return res
          .status(404)
          .json({ error: "Data not found for selected date" });
      }
      res.json(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};

const handleInsertSong = async (app) => {
  app.post("/api/insert-song", async (req, res) => {
    const { selectedDate, selectedTimeSlot, songTitle, artist, genre } =
      req.body;

    try {
      // Find document corresponding to the selected date
      const dateEntry = await DateModel.findOne({ date: selectedDate });

      // Update the djList array with the new song information
      dateEntry.timeSlots.forEach((timeSlot) => {
        if (timeSlot.startTime === selectedTimeSlot) {
          timeSlot.djList.push({ songName: songTitle, artist, genre });
        }
      });

      // Save the updated document back to the database
      await dateEntry.save();

      res.status(200).send("Song added to playlist successfully.");
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      res.status(500).send("Internal server error.");
    }
  });
};

module.exports = {
  handleAllDates,
  handleSingleDate,
  handleSelectedDate,
  handleInsertSong,
};
