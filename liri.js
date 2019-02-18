// Require dotenv npm to link Spotify keys file
require("dotenv").config();

// ===== MODULES =====

var fs = require("fs") // Load the fs package for reading and writing files

var keys = require("./keys.js"); // Load Spotify keys and store in a variable

var request = require("request") // Include the request npm package

var Spotify = require('node-spotify-api'); // Require Spotify npm to access its API

var moment = require('moment'); // Require moment npm
moment().format(); // to format the date @ concertThis function

// ===== NODE ARGUMENTS ======

// Get command line arguments and store in a variable
var nodeArgs = process.argv;
// Take two arguments.
// // The first is the 'user command' 
// // (i.e. "concert-this", "spotify-this-song", "movie-this", "do-what-it-says")
var userCommand = process.argv[2];
// // The second is be the 'user input'
// // (i.e. "Mettalica" or "Titanic" etc)
var userInput = "";

//  ===== Command line CONDITIONER to run respective function ======

switch (userCommand) {
    case "concert-this": // "concert-this" command set
        setMedia(); // setMedia function to run
        concertThis(userInput); // and concertThis function to run 
        break;

    case "spotify-this-song": // "spotify-this-song" command set
        setMedia(); // setMedia function to run
        spotifyThis(userInput); // and spotifyThis function to run
        break;

    case "movie-this": // "movie-this" command set 
        setMedia(); // setMedia function to run
        movieThis(userInput); // and movieThis function to run
        break;

    case "do-what-it-says": // "do-what-it-says" command set
        doThis(); // doThis function to run
        break;

    default: // Console log default if no arguments are passed by user
        console.log("\n" + "Sorry, wrong command." + "\n" + "Try 'concert-this', 'spotify-this-song', 'movie-this' or 'do-what-it-says'" + "'artist/song/movie name'" + "\n");
}

// ===== FUNCTIONS ======

// Get user input for song/artist/movie name
function setMedia() {
    for (var i = 3; i < nodeArgs.length; i++) { // Loop starting at process.argv[3]
        if (i > 3 && i < nodeArgs.length) { // Handle user input with multiple words
            userInput = userInput + " " + nodeArgs[i];
        }
        // Or if user input is only 1 word
        else {
            userInput += nodeArgs[i];
        }
    }

    // Set default for concerts...
    if (userCommand === "concert-this" && nodeArgs.length <= 3) {
        queryUrl = "https://rest.bandsintown.com/artists/artists/events?app_id=codingbootcamp";
    }
    // otherwise accepts user input
    else {
        queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    }

    // Sets default for Spotify
    if (userCommand === "spotify-this-song" && nodeArgs.length <= 3) {
        userInput = "The+Sign+Ace+of+Base"
    }

    // Set default for movie...
    if (userCommand === "movie-this" && nodeArgs.length <= 3) {
        queryUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy"
    }
    // otherwise accepts user input
    else {
        queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
    }
}

// Function Concert This
function concertThis() {
    // If statement for no concert provided
    if (!userInput) {
        console.log("Try typing an artist or band after 'concert-this'.")
    }
    else {
        fs.appendFile("log.txt", "--------------" + userInput + "--------------" + "\n", function (error) {
            if (error) {
                console.log(error);
            };
        });
    }
    // Run request to bandsintown API with the specified artist
    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
    request(queryURL, function (error, response, body) {
        if (!error && response.statusCode === 200) { // If there is no error and response is a success
            var concertData = JSON.parse(body); // parse the json response into data
            console.log("log.txt was updated") // Console.log that data was added to the log.txt file
            // Loop through data array
            for (var i = 0; i < concertData.length; i++) {
                // console.log("Venue: " + concertData[i].venue.name); // Console log venue name
                fs.appendFile("log.txt", "Venue: " + concertData[i].venue.name + "\n", function (error) { // Append venue name to log.txt
                    if (error) {
                        console.log(error);
                    }
                });
                // Get venue location
                // If statement for concerts without a region
                if (concertData[i].venue.region == "") {
                    // console.log("Location: " + concertData[i].venue.city + ", " + concertData[i].venue.country);
                    // Append venue city and country to log.txt
                    fs.appendFile("log.txt", "Location: " + concertData[i].venue.city + ", " + concertData[i].venue.country + "\n", function (error) {
                        if (error) {
                            console.log(error);
                        };
                    });
                }
                else { // Otherwise
                    // console.log("Location: " + concertData[i].venue.city + ", " + concertData[i].venue.region + ", " + concertData[i].venue.country);
                    // Append venue city, region and country to log.txt
                    fs.appendFile("log.txt", "Location: " + concertData[i].venue.city + ", " + concertData[i].venue.region + ", " + concertData[i].venue.country + "\n", function (error) {
                        if (error) {
                            console.log(error);
                        };
                    });
                }
                // Get concert's date
                var date = concertData[i].datetime;
                date = moment(date).format("MM/DD/YYYY"); // Format using moment.js
                // console.log("Date: " + date)
                // Append event date to log.txt
                fs.appendFile("log.txt", "Date: " + date + "\n----------------\n", function (error) {
                    if (error) {
                        console.log(error);
                    };
                });
            }
        }
    });
}

function spotifyThis(userInput) {
    // Run request to Spotify API with the specified artist
    var spotify = new Spotify(keys.spotify);
    spotify.search({
        type: "track",
        query: userInput
    }, function (err, data) {
        if (err) {
            console.log("Error occured: " + err)
        }
        else {
            for (var i = 0; i < data.tracks.items.length; i++) {
                var songData = data.tracks.items[0];
                if (i === 0) {
                    // Log song info to console
                    // console.log("Song: " + songData.name + "\n\n" + "Artist: " + songData.artists[0].name + "\n\n" + "Preview URL: " + songData.preview_url + "\n" + "Album: " + songData.album.name);

                    // Write song info to log.txt
                    fs.appendFile('log.txt', "--------------Song: " + songData.name + "--------------" + "\n" + "Artist: " + songData.artists[0].name + "\n" + "Preview URL: " + songData.preview_url + "\n" + "Album: " + songData.album.name + "\n" + "\n", 'utf8', function (err) {
                        if (err) {
                            return console.log("Error occurred: " + err);
                        }
                    });
                }
            }
        }
    })
}

// Movie Function
function movieThis(userInput) {
    // If statement for no movie provided
    if (!userInput) {
        userInput = "Mr Nobody";
        console.log("log.txt was updated with default") // Console.log that data was added to the log.txt file
    }
    else {
        userInput = process.argv[3];
        console.log("log.txt was updated") // Console.log that data was added to the log.txt file
    }
    // Then create a request to the queryUrl
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (error, response, body) {
        var movieData = JSON.parse(body);
        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Log movie info to console
            // console.log("--------------Movie--------------" + "\n" + "Title: " + movieData.Title + "\n" + "Release Year: " + movieData.Year + "\n" + "IMDB Rating: " + movieData.Ratings[0].Value + "\n" + "Rotten Tomatoes: " + movieData.Ratings[1].Value + "\n" + "Country of production: " + movieData.Country + "\n" + "Language: " + movieData.Language + "\n" + "Plot: " + movieData.Plot + "\n" + "Actors: " + movieData.Actors + "\n");

            // Write movie info to log.txt
            fs.appendFile('log.txt', "--------------Movie--------------" + "\n" + "Title: " + movieData.Title + "\n" + "Release Year: " + movieData.Year + "\n" + "IMDB Rating: " + movieData.Ratings[0].Value + "\n" + "Rotten Tomatoes: " + movieData.Ratings[1].Value + "\n" + "Country of production: " + movieData.Country + "\n" + "Language: " + movieData.Language + "\n" + "Plot: " + movieData.Plot + "\n" + "Actors: " + movieData.Actors + "\n" + "\n", 'utf8', function (err) {
                if (err) {
                    return console.log("Error occurred: " + err);
                }
            });
        }
    });
}

// Do what it says function
function doThis() {
    fs.readFile('random.txt', "utf8", function (error, data) {
        if (error) {
            return console.log("Error occurred: " + err);
        } else {
            var content = data.split(',');
            var userInput = content[1].replace(/^"(.+(?="$))"$/, '$1');
            spotifyThis(userInput);
            console.log("log.txt was updated with default");
        }
    });
}