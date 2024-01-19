const watchlist = !localStorage.getItem("watchlist")?[]:JSON.parse(localStorage.getItem("watchlist"))
const watchlistEl = document.getElementById('watchlist');

render();

watchlistEl.addEventListener('click', (evt) => {
    switch(evt.target.dataset.action) {
        case 'remove':
            const index = watchlist.findIndex(({imdbID}) => imdbID === evt.target.dataset.id);
            if(index !== -1) watchlist.splice(index,1);
            localStorage.setItem('watchlist',JSON.stringify(watchlist))
            render()
            break;
    }
});

function render() {
    if(watchlist) {
        watchlistEl.innerHTML = watchlist.map(obj => (`
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
                        <button class="movie-button" data-id="${obj.imdbID}" data-action="remove" aria-label="Remove from watchlist"></button>
                    </div>
                    <p class="movie-summary">${obj.Plot}</p>
                </div>
            </div>
        `)).join('');
    } else {
        // EMPTY
        watchlistEl.innerHTML = `
            <p class="empty">Your watchlist is looking a little empty...</p>
            <a href="index.html"><p class="add-link"><img src="images/plus.svg" alt="+" class="link-icon"><span>Let's add some movies!</span></p></a>
        `
    }
}

