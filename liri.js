require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "15de86dfa227460987ce53e3269cf66e",
  secret: "16a21634a1794bf08814d880bce266ad"
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(JSON.stringify(data)); 
});


// Spotify retrieval
function spotifySong(song) {
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
            console.log('artist(s): ', songs[i].artists[0].name);
            console.log('song name: ', songs[i].name);
            console.log('preview song: ', songs[i].preview_url);
            console.log('album: ', songs[i].album.name);
            console.log('===========================================================');
        }
    });
}