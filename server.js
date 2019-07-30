var express = require("express");
var path = require("path")
const {Pokemon, Team, Status} = require("./classes")
const moveList = require("./db/moves")
const Util = require('./util')
var router = express.Router()

var PORT = process.env.PORT || 8080;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Single route here for game


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});


app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "index.html"))
})


// First test route to get retrieve pokemon data from the db to the client
app.get("/pokemon/:mon", function(req,res){
  console.log(req.params.mon)
  let pokemon = new Pokemon(req.params.mon);
  res.json(pokemon);
})


// Route gets called to build teams
app.get("/pokemon/:mon/team", function(req,res){
  let team = new Team(req.params.mon)
  team.build()
  res.json(team)
})



app.get("/pokemon/choice/:mon", function(req,res){
  console.log(req.body)
  // let test = new Pokemon(req.body.mon);
  // res.json(test);
  res.json("hi")
})

app.get("/moves/:move", function(req,res){
  let response = moveList[req.params.move]
  res.json(response)
})


// Route gets called when user picks move
app.post('/turnChoice/:move', function(req,res){
  let field = req.body.battleState



  Util.stateChange(field)

  
  



  res.json(field)


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

app.post('/calc/:user/:move/:target', function(req,res){

})
