const express = require('express');
const app = express();
const mongoose = require("mongoose");
const session = require('express-session');


mongoose.connect('mongodb+srv://knguye61:Pideltapsi52@knguye61.fhapm74.mongodb.net/RadioStation')
.then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  
app.use ('/public', express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

//Login schema for later implementation
const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});

const UserModel = mongoose.model('User', userSchema);

// Define schema for the "Dates" collection
const dateSchema = new mongoose.Schema({
  date: String,
  timeSlots: [{
    startTime: String,
    endTime: String,
    producerName: String,
    djName: String,
    producerList: [{
      songName: {
        type: String
      },
      artist: {
        type: String
      },
      genre: {
        type: String
      },
      duration: {
        type: String
      }
    }],
    djList: [{
      songName: {
        type: String
      },
      artist: {
        type: String
      },
      genre: {
        type: String
      },
      duration: {
        type: String
      }
    }]
  }]
});

// Define model for the "Dates" collection
const DateModel = mongoose.model('Date', dateSchema);

const songSchema = new mongoose.Schema({
  songName: {
    type: String
  },
  artist: {
    type: String
  },
  genre: {
    type: String
  },
  duration: {
    type: String
  }
});

const SongModel = mongoose.model('Song', songSchema);

// Login route
app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await UserModel.findOne({ username: username, password: password });
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    // Set session data to mark the user as logged in
    req.session.user = user;
    res.redirect('/'); // Redirect to homepage or dashboard
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Logout route
app.get('/logout', (req, res) => {
  // Destroy session to log the user out
  req.session.destroy();
  res.redirect('/'); // Redirect to homepage or login page
});

app.get('/', async (req, res) => {
  try {
    // Check if user is authenticated
    const authenticated = req.session.user ? true : false;

    // Fetch only the 'date' field from the collection
    const date = await DateModel.find();
    
    // Render the 'index' view and pass the 'dates' data and authentication status to it
    res.render('pages/index', { date, authenticated });
  } catch (error) {
    console.error('Error fetching dates:', error);
    res.status(500).send('Internal server error');
  }
});

app.get('/edit/:dateId/:slotIndex', async (req, res) => {
  try {
    
    const dateId = req.params.dateId;
    const date = await DateModel.findOne({ _id: dateId });
    if (!date) {
      // Handle error if the date document is not found
      return res.status(404).send('Date not found');
    }

    const slotIndex = req.params.slotIndex;

    const slotIndexInt = parseInt(slotIndex);

    // Retrieve the time slot using the indices
    const timeSlot = date.timeSlots[slotIndexInt];
    if (!timeSlot) {
      // If the time slot is not found, handle the error
      return res.status(404).send('Time slot not found');
    }

    const song = await SongModel.find();

    // Render the playlist manager page with the timeslotData
    res.render('pages/playlistManagement', { dateId, slotIndexInt, timeSlot, song });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

app.delete('/remove-song/:dateId/:slotIndex/:producerIndex', async (req, res) => {
  try {
    const dateId = req.params.dateId;
    const slotIndex = req.params.slotIndex;
    const producerIndex = req.params.producerIndex;
    const proIndexInt = parseInt(producerIndex);
    // Find the document with the specified dateId
    const date = await DateModel.findById(dateId);
    if (!date) {
      return res.status(404).send('Date not found');
    }
    // Get the timeSlot using the slotIndex
    const timeSlot = date.timeSlots[slotIndex];
    if (!timeSlot) {
      return res.status(404).send('Time slot not found');
    }
    // Remove the song from the producerList array
    timeSlot.producerList.splice(proIndexInt, 1);
    // Save the updated document
    await date.save();

    res.status(200).send('Song removed successfully');
  } catch (error) {
    console.error('Error removing song:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/add-song/:dateId/:slotIndex/:songId', async (req, res) => {
  try {
    const dateId = req.params.dateId;
    const slotIndex = req.params.slotIndex;
    const songId = req.params.songId;

    // Find the document with the specified dateId
    const date = await DateModel.findById(dateId);
    if (!date) {
      return res.status(404).send('Date not found');
    }

    // Get the timeSlot using the slotIndex
    const timeSlot = date.timeSlots[slotIndex];
    if (!timeSlot) {
      return res.status(404).send('Time slot not found');
    }
    
    const song = await SongModel.findById(songId);
    if (!song) {
      return res.status(404).send('Song not found');
    }
    // Add the song to the producerList array
    timeSlot.producerList.push(song);

    // Save the updated document
    await date.save();
    res.status(200).send('Song added to producerList successfully');
  } catch (error) {
    console.error('Error adding song:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(8080);
console.log('Server is listening on port 8080');