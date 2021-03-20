class MoviesView {
    constructor() {
        this.header = document.querySelector('.header');
        this.featuredMovie = $('.featured-movie');
        this.searchInput = document.querySelector('.search__input');
        this.searchResults = document.querySelector('.search-results');
        this.fetchingInfo = document.querySelector('.fetching-info');
        this.scrollToTop = document.querySelector('.scroll-to-top');
    }

    bindSearchInputChange = handler => this.searchInput.addEventListener('keyup', event => {
        handler(event.target.value);
    });


    bindScroll = handler => document.addEventListener('scroll', handler);

    bindScrollToTopClick = handler => this.scrollToTop.addEventListener('click', handler);

    renderFeaturedMovie = movie => {
        this.featuredMovie.css('background-image', `url(http://image.tmdb.org/t/p/w1280${movie.backdrop_path})`);

        const featuredMovieInfo =
            `<div class="featured-movie__info container"> 
                <h2 class="featured-movie__title">${movie.title}</h2> 
                <p class="featured-movie__description">${movie.overview}</p> 
            </div>`

        this.featuredMovie.hide().fadeIn(350, () => this.featuredMovie.append(featuredMovieInfo));

    };

    renderMovies = (moviesList, genresObj) => moviesList.forEach(movie => {
        const movieCard = this._createMovieCard(movie, genresObj);
        this.searchResults.insertAdjacentHTML('beforeend', movieCard);
    });


    toggleFetchingInfo = _ => this.fetchingInfo.classList.toggle('d-none');

    getLastListedMovie = _ => document.querySelector('.movie-card:last-child');

    getTwentiethListedMovie = _ => document.querySelector('.movie-card:nth-of-type(20)');

    getDistanceToTop = element => window.pageYOffset + element.getBoundingClientRect().top;

    removeMoviesList = _ => {
        while (this.searchResults.firstChild) {
            this.searchResults.removeChild(this.searchResults.firstChild)
        }
    }

    setSearchResultsMinHeight = height => this.searchResults.style.minHeight = String(height) + 'px';

    _genreIdToText = (movieGenres, genresObj) => {
        movieGenres = movieGenres.map(genre => genresObj[Number(genre)]);
        return movieGenres.join(', ')
    }

    _createMovieCard = (movie, genresObj) => {
        let poster_path;
        if (!movie.poster_path) {
            poster_path = "main/static/assets/not_available.jpg";
        } else {
            poster_path = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
        }

        const movieCard =
            `<a class="movie-card card mt-5" href="/movie/${movie.id}">
                <img class="card-img-top" src="${poster_path}">
                <div class="card-body position-relative">
                    <h6 class="card-title">${movie.title}</h4>
                    <p class="card-text">${this._genreIdToText(movie.genre_ids, genresObj)}</p>
                    <span class="movie-mark"><p class="my-0">${movie.vote_average}</p></span>
                </div >
            </a >`

        return movieCard
    };
}

export default MoviesView;