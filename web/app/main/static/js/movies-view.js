class MoviesView {
    constructor(){
        this.searchResults = document.querySelector('.search-results');
        this.searchInput = document.querySelector('.search__input');
    };

    renderFeaturedMovie = movie=>{

    };

    renderMoviesList = (moviesList, genresObj)=>{
        this._removeMoviesList();
        $('.search-results').append(this._createMoviesCards(moviesList, genresObj))
        .hide()
        .fadeIn(500);
    }

    bindSearchInputChange = handler => {
       this.searchInput.addEventListener('keyup', this._delay(()=>handler(this.value), 350))
    }

    _delay(callback, ms) {
    var timer = 0;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
    }

    _removeMoviesList = ()=>{
    while (this.searchResults.firstChild) {
    this.searchResults.removeChild(this.searchResults.firstChild)
    }}

    _genreIdToText = (movieGenres,genresObj) => {
    movieGenres = movieGenres.map(genre => genresObj[Number(genre)]);
    return movieGenres.join(', ')
    }

    _createMoviesCards = (moviesList,genresObj) => moviesList.map(movie=>{
        let poster_path;
            if (!movie.poster_path) {
            poster_path = "main/static/assets/not_available.jpg";
        } else {
            poster_path = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
        }

    const movieCard = `
            <div class="movie-card card mt-5">
                <img class="card-img-top" src="${poster_path}">
                <div class="card-body position-relative">
                    <h6 class="card-title">${movie.title}</h4>
                    <p class="card-text">${this._genreIdToText(movie.genre_ids, genresObj)}</p>
                    <span class="movie-mark"><p class="my-0">${movie.vote_average}</p></span>
                </div >
            </div >`

    return movieCard
    });
 }

 export default MoviesView;