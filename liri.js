const KEYS = require("./keys.js");
require("dotenv").config();


class Liri {
  constructor() {
    this.liriCommand = "";
    this.liriArg = [];
    this.liriFile = "./random.txt";
  }

  usage() {
    console.log("USAGE: node liri.js <Command> [param]\n");
    console.log("Available <liriCommand>s are:\n"
                + "\t* concert-this <artist or band>\n"
                + "\t* spotify-this-song <song name>\n"
                + "\t* movie-this <movie name>\n"
                + "\t* do-what-it-says\n"
                );
    return true;
  }

 
  doIt() {
    if (this.procCmdLine()) {
      this.runCmd();
    }
    else {
      this.usage();
    }
  }

  
  procCmdLine() {
    this.liriCommand = process.argv[2];
    this.liriArg = process.argv.slice(3);

    return true;
  }

 
  runCmd() {
    switch(this.liriCommand) {
      case "concert-this":
        this.bandsTown();
        break;
      case "spotify-this-song":
        this.spotifySong();
        break;
      case "movie-this":
        this.omdbMovie();
        break;
      case "do-what-it-says":
        this.doWhats();
        break;
      case undefined:
        this.usage();
        return false;
      default:
        console.log(`Unable to understand the liriCommand "${this.liriCommand}"\n`);
        this.usage();
        return false;
    }

    return true;
  }

  
  bandsTown() {
    const bandsInTown = new BandsInTown(KEYS.bandsintown);
    const artistName = this.liriArg.join(" ");
    bandsInTown.findConcert(artistName);
  }

  
  spotifySong() {
    const spotify = new Spotify(KEYS.spotify);
    var songName = "The Sign Ace of Base";

    if (this.liriArg.length > 0) {
      songName = this.liriArg.join(" ");
    }
    spotify.searchSong(songName);
  }
  
  omdbMovie() {
    const omdb = new OMDbAPI(KEYS.omdb);
    var movieName = "Mr. Nobody";

    if (this.liriArg.length > 0) {
      movieName = this.liriArg.join(" ");
    }
    omdb.findMovie(movieName);
  }

  doWhats() {
    const fs = require('fs');
    var textCmd;

    console.log(`Reading ${this.liriFile} ...`)
    fs.readFile(this.liriFile, 'utf8', (error, textData) => {
      if (error) {
        console.log(error);
        return;
      }

      textCmd = textData.split("\n");
      console.log(textCmd);
      this.runCmdsPerWhatItSays(textCmd);
    });
  }

  
  runCmdsPerWhatItSays(textCmd) {
    for (var i = 0; i < textCmd.length; i++) {
      var items = textCmd[i].split(',');

      if (/-/.test(items[0])) {
        console.log(`\nIt says, ${items.join(' ')}, on line ${i+1}`);

        this.liriCommand = items[0];
        this.liriArg = items.slice(1);
        this.runCmd();
      }
    }
  }
}


class BandsInTown {
  
  constructor(key) {
    this.key = Object.entries(key)[0].join('=');
    this.request = require("request");
    this.moment = require("moment");
    this.maxEvents = 4;
  }

    findConcert(artistName, maxEvents = this.maxEvents) {
    var query = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";    
    
    this.request(query, (error, response, body) => {
      if (error) {
        console.log("ERROR: ", error);
        return;
      }
      const jsonObj = this.body2JSON(body);
      if (!jsonObj) return;
      
      this.printConcertInfo(jsonObj, maxEvents);
    });
  }

  body2JSON(body) {
    const data = JSON.parse(body);   

    if (data.length === 0) {
      console.log("The artist not found.");
      return null;
    }
    if ('errorMessage' in data) {
      console.log(data.errorMessage);
      return null;
    }
    if ('message' in data) {
      console.log(data.message);
      return null;
    }

    return data;
  }

  printConcertInfo(data, maxEvents = this.maxEvents) {    

    for (var i = 0; i < data.length && i < maxEvents; i++ ) {
      var element = data[i];
      var venue = element.venue;
      var location = [venue.city, venue.region, venue.country
                      ].filter(e => e.length > 0).join(", ");
      var date = this.moment(element.datetime).format("MM/DD/YYYY");

      console.log("\n");
      console.log("*********************************************");
      console.log("* " + `Venue: ${venue.name}`);
      console.log("* " + `Location: ${location}`);
      console.log("* " + `Date: ${date}`);
    }
    console.log("*********************************************");
  }
}


// Spotify Commands to search for songs

class Spotify {
  
  // constructor(key) {
  constructor(key) {
    // this.key = Object.entries(key)[0].join('=');
    var Spotify = require('node-spotify-api');
    this.api = new Spotify(key);
    this.spotify = new Spotify(KEYS.spotify);
    // var Spotify = require('node-spotify-api');
  }

  searchSong(song = "The Sign") {
    var params = {
      type: 'track',
      query: song,
      limit: 5
     }

    console.log(`\n=======\nSearching for the song "${song}"`);
    this.api.search(params, function(err, data) {
      if (err) {
        console.log('Error occurred: ' + err);
        return;
      }
      else if (data.tracks.items.length === 0) {
        console.log("No song found.");
        return;
      }
      // console.log(data);

      console.log(`\n=======\nSeach result for the song "${song}"`);
      var items = data.tracks.items;
      for (var i = 0; i < items.length; i++ ) {
        var artist = items[i].artists.map(a => a.name).join(", ");
        var songName = items[i].name;
        var link = items[i].external_urls.spotify;
        var album = items[i].album.name;

        console.log("***********************************************************");
        // console.log("- " + (i + 1) + " -");
        console.log("* " + `Artist(s): ${artist}`);
        console.log("* " + `Song Name: ${songName}`);
        console.log("* " + `Link: ${link}`);
        console.log("* " + `Album: ${album}`);
        
      }
      console.log("***********************************************************");
    });
  }
}



// Commads for searching movies in OMDb

class OMDbAPI {
  
  findMovie() {
    var axios = require("axios");
    var nodeArgs = process.argv;
    var movieName = "";
    
    for (var i = 3; i < nodeArgs.length; i++) {
    
      if (i > 3 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[i];
      } else {
        movieName += nodeArgs[i];
    
      }
    }
    
    if (movieName.length === 0) {
      movieName = "Mr. Nobody";
      console.log("\n");
      console.log("*********************************************************************************************************");
      console.log("* If you haven't watched Mr. Nobody, then you should. its on Netflix!");
      console.log("*********************************************************************************************************");
      console.log("\n");
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
    
    axios.get(queryUrl).then(
      function(response) {
        console.log("\n");
        console.log("*********************************************************************************************************");
        console.log("* " + "Movie Name: " + response.data.Title);
        console.log("* " + "Release Year: " + response.data.Year);
        console.log("* " + "IMDB Rating: " + response.data.imdbRating);
        console.log("* " + "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("* " + "Language : " + response.data.Language);
        console.log("* " + "Plot: " + response.data.Plot);
        console.log("* " + "Actors: " + response.data.Actors);
        console.log("*********************************************************************************************************");
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
  // findMovie(movieName = "Mr. Nobody") {
  //   var query = [
  //     "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=7116ff6b",
      
  //     `t=${movieName}`,
  //     'page=3',
  //     'type=movie',
  //     'r=json'
  //   ].join('&');

  //   console.log(`\n=======\nFinding the movie "${movieName}"`);
  //   this.request(query, (error, response, body) => {
  //     if (error) {
  //       console.log("ERROR: ", error);
  //       return;
  //     }

  //     const jsonObj = this.body2JSON(body);
  //     if (!jsonObj) return;

  //     console.log(`\n=======\nResult for the movie "${movieName}"`);
  //     this.printMovieInfo(jsonObj);
  //   });
  // }

  //
  // Convert returned body from "request" to JSON
  //
  // RETURN:
  // * JSON, if successful
  // * null, otherwise
  //
  // body2JSON(body) {
  //   const data = JSON.parse(body);
  //   // console.log(data);
  
  //   if ('Error' in data) {
  //     console.log("Error: " + data.Error);
  //     return null;
  //   }
  //   return data;
  // }

  //
  // Facilitator function for findMovie to display the result
  //
  // PARAMS:
  // * data = returned data from calling "request" in JSON format
  //
  // Output the followings to the screen/terminal:
  //     * Title of the movie.
  //     * Year the movie came out.
  //     * IMDB Rating of the movie.
  //     * Rotten Tomatoes Rating of the movie.
  //     * Country where the movie was produced.
  //     * Language of the movie.
  //     * Plot of the movie.
  //     * Actors in the movie.
  //
  // printMovieInfo(data) {
  //   const rottenTomatoes = this.rottenTomatoesRating(data);
  //   const output = [
  //     `Title:    ${data.Title}`,
  //     `Year:     ${data.Year}`,
  //     `Rating:   IMDb ${data.imdbRating}`,
  //     `          Rotten Tomatoes ${rottenTomatoes}`,
  //     `Country:  ${data.Country}`,
  //     `Language: ${data.Language}`,
  //     `Plot:     ${data.Plot}`,
  //     `Actors:   ${data.Actors}`
  //   ];

  //   console.log(output.join("\n"));
  // }

  //
  // Facilitator function for printMovieInfo to get a rating by
  // RottenTomatoes
  //
  // PARAMS:
  // * data = returned data from calling "request" in JSON format
  //
  // RETURN:
  // * Rating value by RottenTomatoes
  //
  // rottenTomatoesRating(data) {
  //   var rottenTomatoes = "(unavailable)";

  //   if ('Ratings' in data) {
  //     var rtRating = data.Ratings.filter(rating =>
  //       rating.Source === 'Rotten Tomatoes'
  //     );
  //     // console.log(rtRaiting);

  //     if (rtRating.length === 1) {
  //       rottenTomatoes = rtRating.shift().Value;
  //     }
  //   }

  //   return rottenTomatoes;
  // }
}


// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
//  MAIN
// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 

const liri = new Liri();

liri.doIt();