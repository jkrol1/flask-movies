import API_KEY from 'api.js';

class MoviesModel {
    constructor() {
        this.movies = this._fetchMovies('popular');
        this.moviesFetching = false;
        this._apiEndpoints = {
            'genres': 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY,
            'popular': 'https://api.themoviedb.org/3/trending/movie/week?api_key=' + API_KEY,
            'search': 'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY +
                '&language=en-US&include_adult=false&query=',
        };
    }

    _fetchMovies = async endpoint => {
        const movies = await fetch(this._apiEndpoints[endpoint]);
        return movies
    };
};