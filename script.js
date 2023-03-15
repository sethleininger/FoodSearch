// Selects the search button by its id and stores it in a variable
let btnSearch2 = document.querySelector("#button-addon3");

// Added event listener to the search button that triggers the function on click
const searchApi2 = btnSearch2.addEventListener("click", function () {

  // Selects search input field, gets its value, trims and converts it to lowercase
  let searchQuery = document.querySelector("input[type = 'search']").value.trim();
  searchQuery = searchQuery.toLowerCase().replace(' ', '_');
 
  // Stores the YouTube API in a variable
  const YOUTUBE_API_KEY = "AIzaSyAIqG_Rna2mkVuTMJMJzjh2yQxvgbgY5hw";
 
  // Create the API endpoint URL by combining the base URL, search query and API key
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=` + searchQuery + `&key=${YOUTUBE_API_KEY}`;
  
  // Make a fetch request to the API endpoint URL, convert the response to JSON and update the iframe element with the video's embed URL
  fetch(url)
    .then(response => response.json())
    .then(data => {
      document.querySelector(".ytplayer").src = `https://www.youtube.com/embed/${data.items[0].id.videoId}`;
      console.log(data);
      console.log(url);
    })
    .catch(function (error) {
      console.log(error);
    });

});

// Add an event listener to the window that triggers a function when the page is unloaded, clearing the local storage
window.addEventListener('beforeunload', () => {
  window.localStorage.clear();
});