// wait for DOM to load before running JS
$(document).ready(function() {

  console.log('JS is loaded!');

  $("#search").on("submit", function(event){
      $("li").remove(); // intiate the page every new search 
  	     event.preventDefault();
  	     var link = $("#track").val();
  	       $.get("https://api.spotify.com/v1/search?q=" + link + "&type=track", function (data){ 
              console.log(data);
  		        var result = data.tracks.items;
  		        result.forEach(function(item){
  			       var artist = item.artists[0].name;
  			       var track = item.name;
               //var artwork = item.album.images[0].url;
               //console.log (artwork); 
  			       var appended = "<li>Artist: " + artist + " track: " + track + "</li>";
  			       console.log(appended);
  			       $("#artistTrack").append(appended);
  			     });
  	     });
  
 });
});