
var express = require('express');
const bodyParser = require("body-parser")
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
var songs;
var schedule;
var today;

function settoday() {
  today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
}

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://thecodyweller:qS2mwjbX8A3loDEE@mason.zdtoibt.mongodb.net/?retryWrites=true&w=majority&appName=Mason";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, { serverApi: { version: '1' } });

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    await getSongs(client);
    settoday();
    await getSchedule(client, today);
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

async function getSchedule(client, tdate) {
  schedule = await client.db("Project").collection("dates").findOne({ date: tdate });

  if (schedule) {
      return true;
  } else {
    schedule ={
      date: today
    }
      return false;
  }
}
async function getSongs(client) {
  songs = await client.db("Project").collection("songs").distinct("songName")

  if (songs) {
  } else {
  }
}

async function addDJ(client, day, slot, dj) {
  const query = { date: day };
  const options = { upsert: true };
  console.log(await getSchedule(client, day))
  if (await getSchedule(client, day)==true){
    const updateDocument = {
      $set: { [`timeSlots.${slot}.djName`]: dj},
    }
    try {
      await client.db("Project").collection("dates").updateOne(query, updateDocument, options);
   } catch (e) {
    console.log(e);
   }
   await getSongs(client)
  }

  else{
    var timeSlots = [4]
     timeSlots[0]={startTime: "12:00 AM",endTime:"6:00 AM"};
     timeSlots[1]={startTime: "6:00 AM",endTime:"12:00 PM"};
     timeSlots[2]={startTime: "12:00 PM",endTime:"6:00 PM"}; 
     timeSlots[3]={startTime: "6:00 PM",endTime:"12:00 AM"};
    timeSlots[slot].djName = dj;
  const updateDocument = {
    $set: { 
      date: day,
      timeSlots: timeSlots
    }
  }
  try {
    await client.db("Project").collection("dates").updateOne(query, updateDocument, options);
 } catch (e) {
  console.log(e);
 }
 await getSongs(client)
  }
}

async function removeDJ(client, day, slot) {
  const query = { date: day };
  const updateDocument = {
    $unset: { [`timeSlots.${slot}.djName`]: ""} 
  }
  const options = { upsert: false };
  try {
    await client.db("Project").collection("dates").updateOne(query, updateDocument, options);
 } catch (e) {
  console.log(e);
 }
 await getSongs(client)
}

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', async function(req, res) {
  settoday();
  await getSchedule(client, today);
  res.render('pages/index', {songs: songs, schedule: schedule});
});


// about page
app.get('/report', function(req, res) {
  res.render('pages/report', {schedule:schedule});
});


// Process form submit
app.post('/', async (req, res) => {
  today=req.body.date;
  if (req.body.button == "Assign DJ"){
    if (req.body.dj!=''){
      console.log("assigned");
      addDJ(client, req.body.date, req.body.slot, req.body.dj);
    }
  }
  else if (req.body.button == "Remove DJ"){
    console.log("deleted");
    removeDJ(client, req.body.date, req.body.slot);
  }
  else if(req.body.button == "Add Song"){
    console.log("song added");
    await addSong(client, req.body.songName, req.body.artist ,req.body.genre ,req.body.duration);
  }
  else if(req.body.button == "Remove Song"){
    console.log("song removed main");
    //removeSong(client, req.body.date, req.body.slot, );
  }
  await getSchedule(client, req.body.date);
  res.render('pages/index', {songs: songs, schedule: schedule});
});

app.get('/date',async (req, res) => {
  console.log("date function in server")
  console.log(req.query.date);
  tdate = req.query.date;
  await getSchedule(client, tdate);
  res.send(schedule);
});


app.listen(8080);
console.log('Server is listening on port 8080');