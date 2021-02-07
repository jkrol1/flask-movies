class MoviesController {
  constructor(model,view){
      this.model=model;
      this.view=view;

      // Initialize controller
      this.init();

      // Attach handlers to eventListeners
      this.view.bindSearchInputChange(this.handleSearchInputChange);
  }

  init = async () => {
      await this.model.initialDataFetching();
      this.onMoviesListChange(this.model.moviesList, this.model.genres);
  }

  onMoviesListChange = (moviesList, genresObj) =>{
      this.view.renderMoviesList(moviesList, genresObj);
  }

  handleSearchInputChange = async searchText => {
    if (searchText === '') await this.model.fetchMovies('popular');
    else await this.model.fetchMovies('search',searchText);
    this.onMoviesListChange(this.model.moviesList, this.model.genres);
  }

};

export default MoviesController;