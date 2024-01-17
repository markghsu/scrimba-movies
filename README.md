# scrimba-movies
Movie picker app for Scrimba Frontend course

## Design
![Design for the app -- one page allows searching for films, which are then listed. Another page has a watchlist populated by films users can add.](images/design.png)

## Requirements
- Two pages index.html, watchlist.html, following given UI design
- Index.html is a search page, where users can type search terms. The page must call the [OMDB API](https://www.omdbapi.com/) with title searched for, and display search results
- The movies displayed must have a button to "add to watchlist", which saves that data to local storage
- Watchlist.html loads and displays data from local storage
- Each movie on the watchlist must have a button to "remove from watchlist"