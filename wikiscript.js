let btnSearch = document.querySelector("#button-addon3");

//search api by request url function, had to set a "new header" for wikimedia api
function searchApi() {

    let searchQuery = document.querySelector("input[type = 'search']").value.trim().toLowerCase().replace(' ', '_');
    let requestUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${searchQuery}`
    // console.log(requestUrl);

    fetch(requestUrl, {
        method: 'GET',
        headers: new Headers({
            'Api-User-Agent': 'Example/1.0'
        })
    })
        .then(function (response) {
            return response.json();
        }).then(function (response) {
            // console.log(response.description);
            // console.log(response.extract);
            // console.log(response.title);

            let searchName = document.getElementById("wiki");
            let searchNameUrl = response.title;
            searchName.innerHTML = searchNameUrl;

            let descr = document.getElementById("description");
            let descrUrl = response.description;
            descr.innerHTML = descrUrl;

            let extr = document.getElementById("extract");
            let extrUrl = response.extract;
            extr.innerHTML = extrUrl;


            if (response.items === searchQuery.value) {
                saveToLocalStorage(response);
                // console.log(`Your search page '${searchQuery}' exists on English Wikipedia`);
            } else {
                // console.log(`No search results found for '${searchQuery}'`);
            }
        })

        .catch(function (error) {
            console.log(error);
        });
    //set timeout for the past search results to populate
    setTimeout(() => {
        // console.log("Delayed for 1 second.");
        readProjectsFromStorage();
    }, "1000");

    document.querySelector("input[type = 'search']").value = " ";
};

btnSearch.addEventListener("click", searchApi);

//saves to local storage through JSON
function saveToLocalStorage(response) {

    let savedInfo = localStorage.getItem('saved-info');
    if (savedInfo) {
        savedInfo = JSON.parse(savedInfo);
    } else {
        savedInfo = [];
    }

    // console.log("test");

    let searchNameUrl = response.title;
    // let descrUrl = response.description;
    // let extrUrl = response.extract;
    let object = {
        searchNameUrl,
        //    descrUrl,
        //   extrUrl
    };
    // console.log(object);
    // console.log(savedInfo);
    savedInfo.push(object);
    localStorage.setItem('saved-info', JSON.stringify(savedInfo));

    // console.log(savedInfo);


}


//this function reads saved data from local, using the search input as the key and then displays within a past search history container.
function readProjectsFromStorage() {
    let savedInfo = localStorage.getItem('saved-info');
    // console.log(savedInfo);
    if (savedInfo) {
        savedInfo = JSON.parse(savedInfo);
    } else {
        savedInfo = [];
    }

    let pastResults = document.querySelector("#playlist");
    pastResults.innerHTML = "";
    savedInfo.forEach(searchHist => {
        console.log(searchHist);
        let pastSearch = document.createElement("p");
        pastSearch.textContent = searchHist.searchNameUrl;
        console.log(searchHist.searchNameUrl);
        pastSearch.classList.add("bg-gray-500", "border", "border-black", "text-white");

        // pastSearch.addEventListener("click", (event) => {
        //     let text = searchHist.searchNameUrl;
        //     async () => {
        //         try {
        //             await navigator.clipboard.writeText(text);
        // console.log('Content copied to clipboard');
        //         } catch (err) {
        // console.error('Failed to copy: ', err);
        //         }
        //     }



        //         event.stopPropagation();
        //         let newSearchQuery = searchHist.searchNameUrl.trim().toLowerCase().replace(' ', '_');
        // console.log(newSearchQuery);
        //         let searchWikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${newSearchQuery}`

        // console.log("Test" + searchWikiUrl);
        //         searchApi(searchWikiUrl);
        // });
        pastResults.appendChild(pastSearch);
    });

}
