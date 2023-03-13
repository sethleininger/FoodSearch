
let btnSearch = document.querySelector("#button-addon3");

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
                saveToLocalStorage(response);
                // console.log(`Your search page '${searchQuery}' exists on English Wikipedia`);
            } else {
                // console.log(`No search results found for '${searchQuery}'`);
            }
        })

        .catch(function (error) {
            console.log(error);
        });
    setTimeout(() => {
        // console.log("Delayed for 1 second.");
        readProjectsFromStorage();
    }, "1000");


    document.querySelector("input[type = 'search']").value = " ";


};
btnSearch.addEventListener("click", searchApi);



function saveToLocalStorage(response) {

    let savedInfo = localStorage.getItem('saved-info');
    if (savedInfo) {
        savedInfo = JSON.parse(savedInfo);
    } else {
        savedInfo = [];
    }

    // console.log("test");

    let bandNameUrl = response.title;
    // let descrUrl = response.description;
    // let extrUrl = response.extract;
    let object = {
        bandNameUrl,
        //    descrUrl,
        //   extrUrl
    };
    // console.log(object);
    // console.log(savedInfo);
    savedInfo.push(object);
    localStorage.setItem('saved-info', JSON.stringify(savedInfo));

    // console.log(savedInfo);


}


//this is meant to be reading saved data from local, using the search input as the 
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
        pastSearch.textContent = searchHist.bandNameUrl;
        console.log(searchHist.bandNameUrl);
        pastSearch.classList.add("bg-gray-500", "border", "border-black", "text-white");

        // pastSearch.addEventListener("click", (event) => {
        //     let text = searchHist.bandNameUrl;
        //     async () => {
        //         try {
        //             await navigator.clipboard.writeText(text);
        // console.log('Content copied to clipboard');
        //         } catch (err) {
        // console.error('Failed to copy: ', err);
        //         }
        //     }



        //         event.stopPropagation();
        //         let newSearchQuery = searchHist.bandNameUrl.trim().toLowerCase().replace(' ', '_');
        // console.log(newSearchQuery);
        //         let searchWikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${newSearchQuery}`

        // console.log("Test" + searchWikiUrl);
        //         searchApi(searchWikiUrl);
        // });
        pastResults.appendChild(pastSearch);
    });

}

//deletes local storage when page is reloaded
