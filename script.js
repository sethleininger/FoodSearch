//global variables

//function handle
const form = document.querySelector('#button-addon3');

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();
    const inputValue = document.querySelector('.search').value;
    const searchQuery = inputValue.trim();

    try {
        const results = await searchWikipedia(searchQuery);
        console.log(results);
    } catch (err) {
        console.log(err);
        alert('Failed to search wikipedia');
    }
}

async function searchWikipedia(searchQuery) {
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    const response = await fetch(wikiUrl);
    if (!response.ok) {
        throw Error(response.statusText);
    }
    const json = await response.json();
    return json;
}


function displayResults(results) {
    const resultList = document.querySelector('.js-results');
    resultList.innerHTML = ''; // <-- Clear any previous results
    results.query.search.forEach((result) => {
        const title = result.title;
        const snippet = result.snippet;
        const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = url;
        a.textContent = title;
        const p = document.createElement('p');
        p.textContent = snippet;
        li.appendChild(a);
        li.appendChild(p);
        resultList.appendChild(li);
    });
}
//In this modified handleSubmit function, the searchWikipedia function is called as before,
// but the displayResults function is called with the results as an argument.The displayResults function 
// creates an unordered list element(<ul>) with a class name of js-results, and for each search result, it 
// creates a list item element (<li>), an anchor element (<a>), and a paragraph element (<p>). The anchor 
// element is set up with the result's title and URL, while the paragraph element contains the result's snippet.
//  These elements are then appended to the list item element, which is appended to the unordered list element.

//const results = await searchWikipedia(searchQuery);
console.log(results);
displayResults(results);

