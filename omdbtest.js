var liriCommand = process.argv[2];

var axios = require("axios");

require("dotenv").config();
var keys = require("./keys.js");




if (liriCommand === "movie-this") {
    omdbMovie();

      
}
else if (liriCommand === "concert-this") {
    bandsTown();
}

else if (liriCommand === "spotify-this-song") {
    spotifySong();
}

else if (liriCommand === "do-what-it-says") {
    doWhat();
}

else {
  console.log("You need to enter a command for LIRI, Such as:  movie-this, concert-this, spotify-this-song, OR do-what-it-says");
  
}
    




function omdbMovie() {

    var nodeArgs = process.argv;
    var movieName = "";
    
    for (var i = 3; i < nodeArgs.length; i++) {
    
      if (i > 3 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[i];
      } else {
        movieName += nodeArgs[i];
    
      }
    }
    
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=7116ff6b";
    
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
    
    axios.get(queryUrl).then(
      function(response) {
        console.log("Movie Name: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Language : " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });

}

function bandsTown() {

    var nodeArgs = process.argv;
    var artistName = "";
    
    for (var i = 3; i < nodeArgs.length; i++) {
    
      if (i > 3 && i < nodeArgs.length) {
        artistName = artistName + "+" + nodeArgs[i];
      } else {
        artistName += nodeArgs[i];
    
      }
    }
    
    var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
    
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
    
    axios.get(queryUrl).then(
      function(response) {
        console.log("Artist Name: " + response.data.lineup);
        console.log("Concert Venue: " + response.data.venue.name);
        console.log("Location of Venue: " + response.data.venue.country);
        console.log("Concert Date: " + response.data.datetime);
        
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });

}

function spotifySong() {
    var spotify = new Spotify(keys.spotify);

    var Spotify = require('node-spotify-api');
    
    var spotify = new Spotify({
        id: "15de86dfa227460987ce53e3269cf66e",
        secret: "16a21634a1794bf08814d880bce266ad"
    });


    if (song === ' ' || song === undefined) {
        song = "love"
    }

    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        };

        var songs = data.tracks.items;
        for (let i = 0; i < songs.length; i++) {

            console.log('number: ', i + 1, '/', songs.length);
            console.log("Artist Name: " + songs[i].artists[0].name);
            console.log("Song Title: " + songs[i].name);
            console.log("Spotify Link: " + songs[i].preview_url);
            console.log("Album: " + songs[i].album.name);

            // console.log('artist(s): ', songs[i].artists[0].name);
            // console.log('song name: ', songs[i].name);
            // console.log('preview song: ', songs[i].preview_url);
            // console.log('album: ', songs[i].album.name);

        }
    });

}

function doWhat() {
    var fs = require("fs");
    // var text = liriCommand + ", " + process.argv[3];

    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
        

        nodeArgs = data;
        var song = "";
        
        for (var i = 3; i < nodeArgs.length; i++) {
        
        if (i > 3 && i < nodeArgs.length) {
            song = song + "+" + nodeArgs[i];
        } else {
            song += nodeArgs[i];
        
        }
        }
        
        var queryUrl = 
        
        // This line is just to help us debug against the actual URL.
        console.log(queryUrl);
        
        axios.get(queryUrl).then(
        function(response) {
            console.log("Artist Name: " + response.data.Artist);
            console.log("Song Title: " + response.data.Track);
            console.log("Spotify Link: " + response.data.Link);
            console.log("Album: " + response.data.Album);
            
        })
        .catch(function(error) {
            if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
            } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
            }
            console.log(error.config);
        });

        


        
        // console.log(data);
      
        // Then split it by commas (to make it more readable)
        // var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        // console.log(dataArr);
      
    });
      

   

}