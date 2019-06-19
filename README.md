#### LIRI-NODE_APP ####

# Description
LIRI is a command line node app. It is a _Language_ Interpretation and Recognition Interface. LIRI takes in parameters as an input from users and gives user back data that is requested for. In this case, this will be a search in Spotify for songs, Bands in Town for concerts, and OMDB for movies.

LIRI understands and reponds to the following four commands:

#concert-this 
                    -- Search for an artist or band concert information
#spotify-this-song 
                    -- Search for an information about a song on Spotify
#movie-this 
                    -- Search for a movie information on OMDb
#do-what-it-says 
                    -- Reads the commands from a text file called random.txt


# Usages and Outputs (requirements)

node liri.js concert-this <artist/band name>

This will search the band name or artist Events or Concert and respond with these information on the terminal:
                Name of the venue
                Venue location
                Date of the Event ("MM/DD/YYYY") - Date is formayet with moment.js


node liri.js spotify-this-song <song name>

This shows the  information about the song in terminal bash:

                Artist Name
                Song's Title
                A link to the song in Spotify
                The album of the song

node liri.js movie-this <movie name>

This shows the below information to the terminal bash:

                Movie Title.
                The Year of the movie.
                IMDB Rating.
                Rotten Tomatoes Rating.
                Country.
                Language.
                Plot.
                Actors.

If no user input, the program will give a default data for the movie "Mr. Nobody".

node liri.js do-what-it-says

LIRI will use the text inside of random.txt and then use it as a command.

Technologies used:

Spotify API
OMDB API
Bands in Town API

.gitignore  -- This will not allow git to copy some certain files to the GitHup repository
package.json -- npm packages.
.env -- tThis files holds the API keys that is pertain only to the PC.










