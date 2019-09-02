var express = require("express");
var session = require('express-session')
var path = require("path")
const uuid = require('node-uuid')
const {Pokemon, Team, Status} = require("./classes")
const moveList = require("./db/moves")
const Util = require('./util')
const Field = require('./field.js')
const BattleRoom = require('./classes/BattleRoom.js')
const socket = require('socket.io')
var router = express.Router()

var PORT = process.env.PORT || 8080;

var app = express();


// // db config data
// var firebaseConfig = {
//   apiKey: "AIzaSyBNueBWgUVIZHZTW6Qdutb3hLoKAk8RQ3E",
//   authDomain: "pokeschool-720e3.firebaseapp.com",
//   databaseURL: "https://pokeschool-720e3.firebaseio.com",
//   projectId: "pokeschool-720e3",
//   storageBucket: "",
//   messagingSenderId: "858353794996",
//   appId: "1:858353794996:web:5a6c4fcdcb002ac4"
// }

// // Set up db connection
// const firebase = require('firebase')
// const fireApp = firebase.initializeApp(firebaseConfig)
// const db = firebase.firestore()

// // Exporting db for use in service objects
// module.exports = db

// Setting up express session for users
app.use(session({
  genid: function(req){
    return uuid.v1()
  },
  secret: 'charizard',
  resave: false,
  saveUninitialized: true,
  cookie: {secure:false}
}));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Variable where we will store the Field
let field,teamA,teamB;

// Start our server so that it can begin listening to client requests.
const server = app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});


// Feeding our express app into socket
const io = socket(server)

io.on('connection',(socket)=>{
  console.log('Pokemon all on my sockets')

  socket.on('battle',(data)=>{
    console.log(data)
  })
})




























// First test route to get retrieve pokemon data from the db to the client
app.get("/pokemon/:mon", function(req,res){
  let pokemon = new Pokemon(req.params.mon);
  res.json(pokemon);
})


// Route gets called to build teams then build Field
app.get("/pokemon/:mon/team", function(req,res){
  console.log(req.sessionID)
  // let docref = db.collection('gameRooms').doc();
  // req.session.docref = docref.id
  var docrefID;
  var state;
  let team = new Team(req.params.mon)
  team.build()
  switch (req.params.mon){
    case ("Charizard"):
      teamB = new Team("Blastoise")
      teamB.build()
      break;
    case ("Blastoise"):
      teamB = new Team("Venusaur")
      teamB.build()
      break;
    case ("Venusaur"):
      teamB = new Team("Charizard")
      teamB.build()
      break;
  }

  field = new Field(team,teamB)
  let battleRoom = new BattleRoom(team,teamB)

  battleRoom.initialize()
    .then((response)=>{
      req.session.docref = response.docID;
      state = response.state
      req.session.save();
      res.send(state)
    })
    .catch((err)=>{
      console.log(err)
    })

  // Leaving the reference on the state itself for testing purposes
  // field.ref = docref.id
  
  // res.send(field)
})



app.get('/', function(req,res){ 
  console.log(req.sessionID)
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/pullGame/',function(req,res){
  Util.battleRoomHelper.pullClientState(req.session.docref)
    .then((result)=>{
      console.log(result.state)
      res.send(result.state)
    })
    .catch(err=>console.log(err))
})


//route to test if field change persists
app.post('/test', function(req,res){
  console.log(req.sessionID)
  console.log(req.session)
  req.session.save();
  res.json("test");
})

// route for switching active mon
app.post('/turnChoice/switch/:mon', function(req,res){
  let mon = req.params.mon;
  Util.handleUserChoice.switch(req.body.state,mon,req.session.docref)
    .then(()=>{
      res.sendStatus(200);
    })
    .catch(err=>{console.log(err)})
})

// Test route for pokemon data
app.get("/pokemon/choice/:mon", function(req,res){
  res.json("hi")  
})

// Test route for move data
app.get("/moves/:move", function(req,res){
  let response = moveList[req.params.move]
  res.json(response)
})


// Switch route, fires from Switch Scene and modifies field state
app.get('/switch/:mon', function(req,res){
  let newMon = req.params.mon;
  
  Util.handleUserChoice.switch(req.body.state,newMon,req.session.docref)
})





// Should be post route
// Route gets called when user picks move
app.get('/turnChoice/:move', function(req,res){
  console.log(req.session.docref)

  field.state.user1Move = req.params.move
  

  // Util.stateChange(field).then()
  field.turnStart()
    .then(()=>{
      res.json(field.state)
    });
  



  // The user sends a move they chose that turn, from here the server
  // should do the rest of the heavy lifting.
  // 
  // 1. The enemy AI needs to pick a move
  // 2. The moves must be executed
  //    *Will need a reference to the active pokemon (For health and stat changes)
  // 3. The tics must be executed
  // 
  // We will run all that logic and return the end state of that process
  // to the user.
  //
  // The data will be formatted as follows
})

app.post('/turnchoice', (req,res)=>{
  let move = req.body.move;
  Util.battleRoomHelper.pullClientState(req.session.docref)
    .then((state)=>{
      Util.battleTurnHelper.runAttack(state,move)
      res.send('works')
    })
})




