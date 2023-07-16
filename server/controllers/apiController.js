const apiController = {};

apiController.getEvents = async (req, res, next) => {};

module.exports = apiController;

//--> Function below is a get request to search for a specific artist using user input that is not seen<--
//--> I was also terrible with catching errors, but functions to interact with spotify API must be async
// async function search() {

//--> this part is refreshing the page if user input is blank
//   if(searchInput.trim() === ""){
//     window.location.reload();
//   };

//--> searchParams is just building out "init" obj (2nd param in fetch req) that lets you control things about the fetch request.
//--> Check spotify docs to see the specific requirements they need in this 'init' obj depending on what you are requesting
//   var searchParams = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + accessToken
//     }
//   }
//access supplied by OAuth
//! access token duration not known yet
//TODO: store user access token in database upon sign-in

//--> Creating a variable to store the response from this get request, the result was an **artist ID**
//--> the FETCH URL can be found on spotify's doc. The hard part is LOOKING AT THE URL SYNTAX + making sure the fetch 'init' options are correct
//   var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParams)
//     .then(res => res.json())
//     .then(data => {
//       console.log(data.artists.items[0]) <--- this console.log'd the *first* artist and their data that came up after searching for the user input on spotify's database
//       return data.artists.items[0].id <--- this returns the 'id' property for that specific artist NOTE: items is a huge array of artists that match the user input, organized by popularity/relevance
//     });
// }
//! pull top artists from spotify API
// initially generate top 5 artists and generes and add to preferences
