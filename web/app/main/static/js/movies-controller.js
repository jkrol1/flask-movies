class MoviesController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Initialize controller
        this.init();

        // Attach handlers to eventListeners
        this.view.bindSearchInputChange(this._delay(this.handleSearchInputChange, 350));
    }

    init = async () => {
        await this.model.initialDataFetching();
        this.onMoviesListChange(this.model.moviesList, this.model.genres);
    }

    onMoviesListChange = (moviesList, genresObj) => {
        this.view.renderMoviesList(moviesList, genresObj);
    }

    handleSearchInputChange = async searchText => {
        if (searchText === '') await this.model.fetchMovies('popular');
        else await this.model.fetchMovies('search', searchText);
        this.onMoviesListChange(this.model.moviesList, this.model.genres);
    }

    handleScroll = async _ => {
        const lastListedMovieRect = this.view.lastListedMovie.getBoundingClientRect();
        const twentiethMovieRect = this.view.twentiethListedMovie.getBoundingClientRect();
        if (lastListedMovieRect.top - window.innerHeight < 0) {
            if (this.model.page < this.model.totalPages && this.model.fetching === false) {
                this.model.page += 1;
                this.model.fetching = true;
                this.view.toggleFetchingInfo();

                $.ajax({
                    url: apiEndpoints[app.category] + app.searchQuery + '&page=' + app.page,
                    type: 'GET',
                    success: delay(appendNextMoviesPage, 1000),
                    error: onMoviesAjaxError
                });
            }

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