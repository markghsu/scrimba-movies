const myAPI = "https://www.omdbapi.com/?apikey=5020cb07"
let searchResults = [];
const watchlist = !localStorage.getItem("watchlist")?[]:JSON.parse(localStorage.getItem("watchlist"))
const formEl = document.getElementById('search-form');
const searchResultsEl = document.getElementById('search-results');

formEl.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(formEl);
    const search = formData.get('search');
    document.getElementById('search-results').innerHTML = `<p class="message">Searching...</p>`
    fetch(`${myAPI}&s=${search}`)
    .then((res) => res.json())
    .then((data) => {
        // CURRENTLY IGNORE PAGINATION
        // IN THE FUTURE, WE CAN MAINTAIN PAGINATION FOR THIS
        if(data.Response === "False" || data.Error || !data.Search) {
            document.getElementById('search-results').innerHTML = `<p class="message">No movies found. Please try again!</p>`
            return;
        }
        const moreData = data.Search.map(obj => fetch(`${myAPI}&i=${obj.imdbID}`).then(res => res.json()));
        Promise.all(moreData).then((values) => {
            searchResults = values;
            formEl.reset();
            render();
        });
    })
});

searchResultsEl.addEventListener('click', (evt) => {
    switch(evt.target.dataset.action) {
        case 'add':
            const movie = searchResults.find(({imdbID}) => imdbID === evt.target.dataset.id);
            if(!movie) {
                // MOVIE DOESN'T EXIST
                return;
            }
            watchlist.push(movie);
            localStorage.setItem('watchlist',JSON.stringify(watchlist))
            evt.target.dataset.action = 'remove';

            break;
        case 'remove':
            const index = watchlist.findIndex(({imdbID}) => imdbID === evt.target.dataset.id);
            if(index !== -1) watchlist.splice(index,1);
            localStorage.setItem('watchlist',JSON.stringify(watchlist))
            evt.target.dataset.action = 'add';
            break;
    }
});

function render() {
    document.getElementById('search-results').innerHTML = searchResults.map(obj => (`
        <div class="movie-info">
            <img class="movie-img" alt="Movie poster" src="${obj.Poster}">
            <div class="movie-text">
                <div class="movie-row">
                    <h3 class="movie-title">${obj.Title}</h3>
                    <img src="images/star.svg" alt="star">
                    <span class="movie-rating">${obj.imdbRating}</span>
                </div>
                <div class="movie-row">
                    <span class="movie-time">${obj.Runtime}</span>
                    <span class="movie-tags">${obj.Genre}</span>
                    <button class="movie-button" data-id="${obj.imdbID}" data-action="${watchlist.find(({imdbID}) => imdbID === obj.imdbID)?'remove':'add'}" aria-pressed="false" aria-label="Add to watchlist"></button>
                </div>
                <p class="movie-summary">${obj.Plot}</p>
            </div>
        </div>
    `)).join('');
}

