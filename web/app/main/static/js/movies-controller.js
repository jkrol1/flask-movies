class MoviesController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Initialize controller
        this.init();

        // Attach handlers to eventListeners
        this.view.bindSearchInputChange(this._delay(this.handleSearchInputChange, 350));
        this.view.bindScroll(this.handleScroll);
        this.view.bindScrollToTopClick(this.handleScrollToTop);
    }

    init = async () => {
        await this.model.initialDataFetching();
        this.view.renderFeaturedMovie(this.model.fetchedMovies[0]);
        this.view.renderMovies(this.model.fetchedMovies, this.model.genres);
        this.view.setSearchResultsMinHeight(this.view.searchResults.offsetHeight);
    }


    handleSearchInputChange = async searchText => {
        this.model.page = 1;

        if (searchText === '') await this.model.fetchMovies('popular');
        else await this.model.fetchMovies('search', searchText);

        this.view.removeMoviesList();
        this.view.renderMovies(this.model.fetchedMovies, this.model.genres);
    }

    handleScroll = async _ => {
        const lastListedMovie = this.view.getLastListedMovie();
        const twentiethMovie = this.view.getTwentiethListedMovie();

        if (lastListedMovie) {
            const lastListedMovieRect = lastListedMovie.getBoundingClientRect();
            const twentiethMovieRect = twentiethMovie.getBoundingClientRect();

            if (lastListedMovieRect.top - window.innerHeight < 0) {
                if (this.model.page < this.model.totalPages && this.model.moviesFetching === false) {
                    await this.handleNextPageFetch();
                }
            }

            if (twentiethMovieRect.top - window.innerHeight < 0) {
                if (!this.view.scrollToTop.classList.contains('show')) this.view.scrollToTop.classList.add('show');
            } else {
                if (this.view.scrollToTop.classList.contains('show')) this.view.scrollToTop.classList.remove('show');
            }
        }
    }

    handleScrollToTop = _ => window.scrollTo({
        top: this.view.getDistanceToTop(this.view.searchInput) - this.view.header.offsetHeight - 10,
        left: 0,
        behavior: 'smooth',
    });


    handleNextPageFetch = async _ => {
        this.model.page += 1;
        this.view.toggleFetchingInfo();

        if (this.model.searchQuery === '') {
            await this.model.fetchMovies('popular', '', 500);
            this.view.renderMovies(this.model.fetchedMovies, this.model.genres);
        } else if (this.model.searchQuery !== '') {
            await this.model.fetchMovies('search', this.model.searchQuery, 500);
            this.view.renderMovies(this.model.fetchedMovies, this.model.genres);
        }

        this.view.toggleFetchingInfo();
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