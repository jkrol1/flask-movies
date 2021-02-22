class MoviesController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Initialize controller
        this.init();

        // Attach handlers to eventListeners
        this.view.bindSearchInputChange(this._delay(this.handleSearchInputChange, 350));
        this.view.bindScroll(this.handleScroll);
    }

    init = async () => {
        await this.model.initialDataFetching();
        this.onMoviesFetch(this.model.fetchedMovies, this.model.genres);
    }

    onMoviesFetch = (moviesList, genresObj) => {
        this.view.renderMovies(moviesList, genresObj);
    }

    handleSearchInputChange = async searchText => {
        this.model.page = 1;
        if (searchText === '') await this.model.fetchMovies('popular');
        else await this.model.fetchMovies('search', searchText);
        this.view.removeMoviesList();
        this.onMoviesFetch(this.model.fetchedMovies, this.model.genres);
    }

    handleScroll = async _ => {
        const lastListedMovie = this.view.getLastListedMovie();
        if (lastListedMovie) {
            const lastListedMovieRect = lastListedMovie.getBoundingClientRect();
            const twentiethMovieRect = this.view.getTwentiethListedMovie().getBoundingClientRect();
            if (lastListedMovieRect.top - window.innerHeight < 0) {
                if (this.model.page < this.model.totalPages && this.model.moviesFetching === false) {
                    this.model.page += 1;
                    this.view.toggleFetchingInfo();
                    await this._delay(this.handleNextPageFetch, 1000);
                    this.view.toggleFetchingInfo();
                }

            }
        }
    }

    handleNextPageFetch = async _ => {
        if (this.model.searchQuery === '') {
            await this.model.fetchMovies('popular');
            this.onMoviesFetch(this.model.fetchedMovies, this.model.genres);
        } else {
            await this.model.fetchMovies('search', this.model.searchQuery);
            this.onMoviesFetch(this.model.fetchedMovies, this.model.genres);
        }
    }

    _delay(callback, ms) {
        let timer = 0;
        return function () {
            const context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                callback.apply(context, args);
            }, ms || 0);
        };
    }

};

export default MoviesController;