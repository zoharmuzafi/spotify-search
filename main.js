// wait for DOM to load before running JS
$(document).ready(function() {

  console.log('JS is loaded!');

  $("#search").on("submit", function(event) {

    //loading gif

    $(".container").append("<div class='row' id = 'loading'><div class='col-md-6 col-md-offset-3'><img src = 'http://www.ctlawtribune.com/static/css/img/loading_spinner.gif'></div></div");


    // intiate the page every new search - need to be changed

    $(".results").remove();

    event.preventDefault();

    var link = $("#track").val();

    //clean the search box

    $("#track").val("");
 

    //call the API + storeing the data

    $.get("https://api.spotify.com/v1/search?q=" + link + "&type=track", function(data) { 
      
        var result = data.tracks.items;


        result.forEach(function(item) {

        //name of the artist

        var artist = item.artists[0].name;

        //name of the track

        var track = item.name;


        //img + check if img exist - if not pu a default img

        var artwork;

        if (item.album.images.length === 0) {

          artwork = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAdVBMVEXX19cAAADd3d0XFxfNzc3n5+dsbGyTk5MgICDa2trj4+PW1tbv7+/f39+urq5ZWVnExMR2dnYKCgq1tbVlZWWcnJw8PDx8fHw1NTUnJydCQkJKSkq/v78iIiIWFhbQ0NCHh4empqYuLi5SUlJISEhfX1+NjY0mh2ctAAAB9ElEQVRoge3XXZOaMBSA4ZxAwHxBQoICRgFx9///xI3ubqdTa+t0IDc9zxVjHF9MmEQJQQghhBBCCCGEEEIIof8Fp3d8m0+Xz4fy6s7wP77rH1Eh2DMWmgh8vBRrp/U4FU+d4C6Ll7NYd8JpyOA1hVy1zOoXu9BUdNXw7iGwHMq2PAwP5XLbsDVcCyE0cb/Oxabho1GC565yOWXK9cnCfmRyfrs9bo2fpTLXROFj7HqA3lvfQVPkLOzThA2TNZxaqTUl7Q72grVNirBVxEMtFTV5HIj3UAtRJwg3RlRNJlko3k3cm3W+b2Y1JwgvnBdQKrN//zyOWAsFpwnCBz322aht/XUMcg57o7rtw6UIUNOxmb8Dqjs79bZ9uBUOPM1/hKUamkr5NN944bIr9ffYJXOq3j58W+PzqKeL/lpjmmiNr4RamBQpjuTzqZ7AapLgqYYg3C7uXrycQhwRoc8q1aYIe8UPcA2MjSOhLBzBCr6kCENgpIbLlDPF5NTDkGqvhksumI2H4q6Lr+4OQlQ/j255Hi8mxuzxlPWDdYK5DhKFYZgZo3lwwWhF2xMkC8PZO6Fu+Lw0sGW4gwdDYf3jj0xo1wxL0T4Wfm8w6/6V4GV3zv7uXLtVZ/q2I8v8FXzl7r39ivWzCCGEEEIIIYQQQgghRD4ABh0hTeEJME0AAAAASUVORK5CYII=";
        } 

        else {
          artwork = item.album.images[0].url;
          console.log(artwork);
        }

        var appendedImg = "<img src = " + artwork + ">";

        // track preview + check if exist (not available by default)

        var preview = "<p class = 'note'>preview N/A</p>";

        if (item.preview_url !== null) {
          preview = "<audio controls><source src='" + item.preview_url + "' type= 'audio/mpeg'></audio>";
        }

        //hide the loading gif

        $("#loading").remove();
        

        //cheacking if the data was found

        $("#loading").remove();

      
        //appending the data to the DOM

        appended = "<div class='row results'><div class='col-md-2 col-md-offset-3'>" + appendedImg + "</div><div class='col-md-2'><h6>Artist:</h6><p>" + artist + "</p><h6>track:</h6><p>" + track + "</p></div><div class='col-md-2'>" + preview + "</div>";
        $(".container").append(appended); 
      
      }); 


        $("#loading").remove();
        $(".container").append("<div class='row results'><div class='col-md-6 col-md-offset-3'><h2>Data Wasn't Found</h2></div></div>");

    });
 
  }); 
});