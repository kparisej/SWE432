const mongoose = require("mongoose");
const songsSchema = new mongoose.Schema({
  songName: String,
  artist: String,
  genre: String,
  duration: String,
});

module.exports = mongoose.model("SongModel", songsSchema, "songs");
