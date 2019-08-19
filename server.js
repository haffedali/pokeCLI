var express = require("express");
var path = require("path")
const {Pokemon, Team, Status} = require("./classes")
const moveList = require("./db/moves")
const Util = require('./util')
const Field = require('./field.js')
const socket = require('socket.io')
var router = express.Router()

var PORT = process.env.PORT || 8080;

var app = express();

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
})




// First test route to get retrieve pokemon data from the db to the client
app.get("/pokemon/:mon", function(req,res){
  console.log(req.params.mon)
  let pokemon = new Pokemon(req.params.mon);
  res.json(pokemon);
})


// Route gets called to build teams then build Field
app.get("/pokemon/:mon/team", function(req,res){
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

  res.json(field)
})


app.get('/', function(req,res){
  res.sendFile(path.join(__dirname, 'index.html'))
})


//route to test if field change persists
app.get('/test', function(req,res){
  field.turnNum += 1
  res.json(field);
})

// Test route for pokemon data
app.get("/pokemon/choice/:mon", function(req,res){
  console.log(req.body)
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
  
})






// Route gets called when user picks move
app.get('/turnChoice/:move', function(req,res){
  field.user1Move = req.params.move
  

  // Util.stateChange(field).then()
  field.turnStart()
    .then(()=>{
      res.json(field)
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




