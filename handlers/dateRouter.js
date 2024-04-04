const DateModel = require("../models/DateModel");
const SongModel = require("../models/SongModel");

//handle GET requests for [domain]/api/books - return all dates
const handleAllDates = (app) => {
  app.get("/api/dates", (req, resp) => {
    // use mongoose to retrieve all books from Mongo
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

const handleSelectedDateSongs = (app) => {
  app.get("/api/dates/:date", async (req, res) => {
    const selectedDate = req.params.date;
    try {
      const data = await DateModel.findOne({ date: selectedDate }).populate(
        "djList"
      );
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

module.exports = {
  handleAllDates,
  handleSingleDate,
  handleSelectedDate,
  handleSelectedDateSongs,
};
