const SongModel = require("../models/SongModel");

// Define a route handler to retrieve all songs
const handleAllSongs = (app) => {
  app.get("/api/songs", async (req, res) => {
    try {
      // Query the SongModel to retrieve all songs
      const songs = await SongModel.find({});

      // Send the retrieved songs as a response
      res.json(songs);
    } catch (error) {
      // Handle any errors
      console.error("Error retrieving songs:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

module.exports = {
  handleAllSongs,
};
