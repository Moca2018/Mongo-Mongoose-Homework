
//In this code we are grabbing the articles as a JSON

$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});

//===========================================================================

//THIS CODE IS AN ON CLICK" FUNCTION FOR WHEN SOMEONE CLICKS A "P" TAG
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
//===========================================================================


//HERE WE ARE MAKING AN AJAX CALL FOR THE ARTICLES
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
//===========================================================================


//NOW WE ARE ADDING THE NOTE INFO. TO THE PAGE

   .then(function(data) {
      console.log(data);
//===========================================================================


//THIS IS FOR THE TITLE OF THE ARTICLE
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
//===========================================================================


//IF SOMEONE ADDS A NOTE TO THE ARTICLE, THEN..
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});
//===========================================================================


//THIS CODE IS FOR THE BUTTON WHERE YOU CLICK ON "SAVING THE NOTES"
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
//===========================================================================


//NOW THIS CODE IS TO RUN A "POST REQUEST" TO CHANGE THE NOTE - USING THE INFO. ENTERED IN THE INPUTS
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
//===========================================================================
//AFTER THAT IS OK -- THEN...
    .then(function(data) {
//===========================================================================
//NOW WE LOG THE RESPONSE
      console.log(data);
//===========================================================================
//AND THEN WE EMPTY THE NOTES SECTION
      $("#notes").empty();
    });

//===========================================================================
//NOW, IN THE NOTE ENTRY - WE REMOVE THE VALUES ENTERED IN THE INPUT AND THE TEXT AREA 

  $("#titleinput").val("");
  $("#bodyinput").val("");
});
