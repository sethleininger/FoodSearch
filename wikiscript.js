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