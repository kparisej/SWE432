const mongoose = require("mongoose");
const datesSchema = new mongoose.Schema({
  date: String,
  day: String,
  timeSlots: [
    {
      startTime: String,
      endTime: String,
      produceName: String,
      producerList: [
        {
          songName: String,
          artist: String,
        },
      ],
      djName: String,
      djList: [
        {
          songName: String,
          artist: String,
          genre: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("DateModel", datesSchema, "dates");
