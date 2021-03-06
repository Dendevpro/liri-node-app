- - - 
# LIRI Bot - Node App  ![Liri Icon](https://img.icons8.com/cotton/64/000000/artificial-intelligence.png)
LIRI is a Language Interpretation and Recognition Interface.
Similar to Apples's Siri, Liri is a command line node app that takes in parameters and gives you back data.

## What Each Command Should Do

### 1. Concert This
`node` `liri.js` `concert-this` `band name` will call the **Bands In Town API** to get data and output the following information about any given **band** or **musician** the user passes to the terminal.

    * Name of the venue
    * Venue location
    * Date of the Event

![Concert This](Gifs/Concert-this-sm.gif)
    
### 2. Spotify This Song
`node` `liri.js` `spotify-this-song` `song name` will call the **Spotify API** to get data and output the following information about any given **song** the user passes to the terminal. _If no song is provided then the program will default to the song "The Sign" by Ace of Base._

    * The song's name
    * Artist(s)
    * A preview link of the song from Spotify
    * The album that the song is from

![Spotify This Song](Gifs/Spotify-this-song-sm.gif)

### 3. Movie This
`node` `liri.js` `movie-this` `movie name` will call the **OMDB API** to get data and output the following information about any given **movie** the user passes to the terminal. _If the user doesn't supply a movie name, the program will default to "Mr. Nobody."_

    * Title of the movie
    * Year the movie came out
    * IMDB Rating of the movie
    * Rotten Tomatoes Rating of the movie
    * Country where the movie was produced
    * Language of the movie
    * Plot of the movie
    * Actors in the movie

![Movie This](Gifs/Movie-this-sm.gif)

### 4. Do What It Says
`node` `liri.js` `do-what-it-says` will read from the file random.txt and then append this text to log.txt.

![Do What It Says](Gifs/Do-this-sm.gif)

- - -
```
All Data requested by the user is appended to log.txt.
```
- - - 
**[View App Demo](https://dendevpro.github.io/bootstrap-portfolio/portfolio.html)**
- - - 
## Project Built With
**_JavaScript_**  |  **_Node.js_**  |  **_Bands In Town, Spotify and OMDB APIs_**
