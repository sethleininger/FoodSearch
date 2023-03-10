// //global variables

// //function handle
// const searchBtn = document.querySelector('#button-addon3');

// form.addEventListener('click', handleSubmit);

// async function handleSubmit(event) {
//     event.preventDefault();
//     const inputValue = document.querySelector('.search').value;
//     const searchQuery = inputValue.trim();

//     try {
//         const results = await searchWikipedia(searchQuery);
//         console.log(results);
//     } catch (err) {
//         console.log(err);
//         alert('Failed to search wikipedia');
//     }
// }

// async function searchWikipedia(searchQuery) {
//     const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
//     const response = await fetch(wikiUrl);
//     if (!response.ok) {
//         throw Error(response.statusText);
//     }
//     const json = await response.json();
//     return json;
// }


// // function displayResults(results) {
// //     const resultList = document.querySelector('.js-results');
// //     resultList.innerHTML = ''; // <-- Clear any previous results
// //     results.query.search.forEach((result) => {
// //         const title = result.title;
// //         const snippet = result.snippet;
// //         const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
// //         const li = document.createElement('li');
// //         const a = document.createElement('a');
// //         a.href = url;
// //         a.textContent = title;
// //         const p = document.createElement('p');
// //         p.textContent = snippet;
// //         li.appendChild(a);
// //         li.appendChild(p);
// //         resultList.appendChild(li);
// //     });
// // }
// //In this modified handleSubmit function, the searchWikipedia function is called as before,
// // but the displayResults function is called with the results as an argument.The displayResults function 
// // creates an unordered list element(<ul>) with a class name of js-results, and for each search result, it 
// // creates a list item element (<li>), an anchor element (<a>), and a paragraph element (<p>). The anchor 
// // element is set up with the result's title and URL, while the paragraph element contains the result's snippet.
// //  These elements are then appended to the list item element, which is appended to the unordered list element.

// const results = await searchWikipedia(searchQuery);
// console.log(results);
// displayResults(results);

/*
    search.js

    MediaWiki API Demos
    Demo of `Search` module: Search for a text or title

    MIT License
*/





let btnSearch = document.querySelector("#button-addon3");

const searchApi = btnSearch.addEventListener("click", function () {

    let searchQuery = document.querySelector("input[type = 'search']").value.trim();
    searchQuery = searchQuery.toLowerCase().replace(' ', '_');
    let requestUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${searchQuery}`
    console.log(searchQuery);

    fetch(requestUrl, {
        method: 'GET',
        headers: new Headers({
            'Api-User-Agent': 'Example/1.0'
        })
    })
        .then(function (response) {
            return response.json();
        }).then(function (response) {
            console.log(response.description);
            console.log(response.extract);
            console.log(response.title);

            let bandName = document.getElementById("wiki");
            let bandNameUrl = response.title;
            bandName.innerHTML = bandNameUrl;

            let descr = document.getElementById("description");
            let descrUrl = response.description;
            descr.innerHTML = descrUrl;

            let extr = document.getElementById("extract");
            let extrUrl = response.extract;
            extr.innerHTML = extrUrl;

            if (response.items === searchQuery.value) {
                console.log(`Your search page '${searchQuery}' exists on English Wikipedia`);
            } else {
                console.log(`No search results found for '${searchQuery}'`);
            }
        })




        .catch(function (error) {
            console.log(error);
        });

});



// let bandInfo = (data) => {
//     let description = data.description[0];
//     console.log(description);

//     let bandPull = `https://en.wikipedia.org/api/rest_v1/page/summary/${searchQuery}`;
//     searchApi(bandPull);


// }



// fetch(requestUrl, {
//     method: 'GET',
//     headers: new Headers({
//         'Api-User-Agent': 'Example/1.0'
//     })
// })
//     .then(function (response) {
//         return response.json();
//     }).then(function (response) {
//         console.log(response);
//         if (response.query.search[0].title === "") {
//             console.log("Your search page 'Nelson Mandela' exists on English Wikipedia");
//         }
//     })
//     .catch(function (error) {
//         console.log(error);
//     });

// const handleFormSubmit = (event) => {
//     event.preventDefault();

//     let requestUrl = `https://en.wikipedia.org/api/rest_v1/page/title/${searchQuery}`
//     let searchInput = document.querySelector('.search').value.trim();
//     searchInput = searchInput.toLowerCase().replace(' ', '-');

//     var params = {
//         action: "query",
//         list: "search",
//         srsearch: "Nelson Mandela",
//         format: "json"
//     };

//     requestUrl = requestUrl + "?origin=*";
//     Object.keys(params).forEach(function (key) {
//         url += "&" + key + "=" + params[key];
//     });
//     console.log(params);


// requestUrl = requestUrl.concat(`geo/1.0/direct?limit=1&q=${cityName}&appid=${APIKey}`);
// searchApi(requestUrl);

// let currentFore = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=imperial`;
// searchApi(currentFore);
//}
//btnSearch.addEventListener('click', handleFormSubmit);



// Using Fetch
// fetch('https://example/...', {
//     method: 'GET',
//     headers: new Headers({
//         'Api-User-Agent': 'Example/1.0'
//     })
// }).then(function (response) {
//     return response.json();
// }).then(function (data) {
//     // ...
// });