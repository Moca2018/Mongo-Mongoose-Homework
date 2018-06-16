var mongoose = require("mongoose");


// THE FOLLOWING SAVES A REFERENCE TO THE SCHEMA CONSTRUCTOR
var Schema = mongoose.Schema;


// NOW, WE CAN USE THE SCHEMA CONSTRUCTOR --AND-- CREATE A NEW NOTESCHEMA OBJECT--SIMILAR TO A SEQUELIZE MODEL
var NoteSchema = new Schema({

// THE TITLE - IS OF TYPE STRING

  title: String,

// BODY - IS OF TYPE STRING

body: String
});



// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
