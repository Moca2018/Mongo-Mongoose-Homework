var mongoose = require("mongoose");


// WE SAVE A REFERENCE TO THE SCHEMA CONSTRUCTOR
var Schema = mongoose.Schema;

// NOW, USING THE SCHEMA CONSTRUCTOR, WE CREATE A NEW USER SCHEMA OBJECT (SIMILAR TO SEQUELIZE MODEL)
var ArticleSchema = new Schema({

// "THE TITLE" IS REQUIRED AND OF TYPE STRING

title: {
    type: String,
    required: true
  },

//THE "LINK" IS REQUIRED AND OF TYPE STRING
  link: {
    type: String,
    required: true
  },

// NOTE IS AN OBJECT THAT STORES A NOTE ID


  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
