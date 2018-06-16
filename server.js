
//===========================================================================
//WE BEGIN WRITTING THE VARIABLES

var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

//===========================================================================
//HERE ARE OUR SCRAPING TOOLS

// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

//===========================================================================
//NOW WE REQUIRE ALL MODELS

var db = require("./models");

var PORT = 5000;

//===========================================================================
//AND NOW WE INITIALIZE EXPRESS
var app = express();


//===========================================================================================
// CONFIGURING MIDDLEWARE

//MORGAN LOGGER - FOR LOGGIN REQUESTS
app.use(logger("dev"));

//USING BODY-PARSER FOR HANDLING FORM SUBMISSIONS
app.use(bodyParser.urlencoded({ extended: true }));

//NOW USING EXPRESS.STATIC TO SERVE THE PUBLIC FOLDER AS A STATIC DIRECTORY
app.use(express.static("public"));


// NOW WE CONNECT TO MONGO DB
mongoose.connect("mongodb://localhost/week18Populater");



//===========================================================================================..
//NOW WE HAVE THE ROUTES


//THE FIRST ROUTE IS FOR SCRAPING THE CNN WEBSITE
app.get("/scrape", function(req, res) {

//WE GRAB THE BODY OF THE HTML WITH REQUEST
  axios.get("http://www.echojs.com/").then(function(response) {

//THEN, WE LOAD THAT INTO CHEERIO AND SAVE IT TO $ FOR A SHORTHAND SELECTOR

var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("article h2").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    res.send("Scrape Complete");
  });
});

//===========================================================================================




// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

//===========================================================================================

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

//===========================================================================================

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});




//===========================================================================================

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});








































// var express = require("express");
// var bodyParser = require("body-parser");
// var logger = require("morgan");
// var mongoose = require("mongoose");
// var cheerio = require("cheerio");
// var exphbs = require("express-handlebars");
// var request = require("request");



// // Require all models
// // var db = require("./models");

// var PORT = 3000 || process.env.PORT;

// // Initialize Express
// var app = express();

// // Configure middleware

// // Use morgan logger for logging requests
// app.use(logger("dev"));
// // Use body-parser for handling form submissions
// app.use(bodyParser.urlencoded({ extended: true }));
// // Use express.static to serve the public folder as a static directory
// app.use(express.static("public"));

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// // Connect to the Mongo DB
// var db = "mongodb://localhost/mongooseArticles" || process.env.MONGODB_URI;
// var dbUrl = "newsArticles";
// var collections = ["cnnArticles"]

// // Set mongoose to leverage built in JavaScript ES6 Promises
// // Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect(db, function(error){
//     useMongoClient:true
//     if (error) {
//         console.log(error);
//     }
//     else {
//         console.log("Connected to Mongoose");
//     }
// }
// );
//-==========================================================================







//-==========================================================================
// Start the server
// app.listen(PORT, function() {
//     console.log("App running on port " + PORT + "!");
//   });
  













//-==========================================================================
//scrape a website 
//serverside will scrape the site (we have a route that will do this)
        //store it in mongodb 
        // will have another route that will "query" the mongodb for articles - and will
        //.......send the info. to handlebars


//once we have that info. from the "scrape" we will send it to the handlebars 
// with handlebars i will be displaying to the client


//stept 2
//the user will be able to add a  notes to the article
//


//-==========================================================================
//at the end use res.render
//line 15 (in the views folder)
//create a views folder -- //create routes // see how they use the routes ///
//models / controllers (can be in)
