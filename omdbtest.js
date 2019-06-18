var liriCommand = process.argv[2];

var axios = require("axios");



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
        console.log("Artist Name: " + response.data.Artist);
        console.log("Concert Venue: " + response.data.Venue);
        console.log("Location of Venue: " + response.data.Location);
        console.log("Concert Date: " + response.data.date);
        
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

    var nodeArgs = process.argv;
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