var express = require("express");
var path = require("path")
var Pokemon = require("./classes/pokemon.js")
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

app.get("/pokemon", function(req,res){
  console.log(req.body)
  // let test = new Pokemon(req.body.mon);
  // res.json(test);
  res.json("hi")
})

app.get("/pokemon/:mon", function(req,res){
  console.log(req.params.mon)
  let test = new Pokemon(req.params.mon);
  res.json(test);
})
