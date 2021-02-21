import API_KEY from './api.js';

class MoviesModel {
    constructor() {
        this.moviesList = [];
        this.page = 1;
        this.totalPages = 0
        this.moviesFetching = false;
        this.searchQuery = '';
        this.genres = {};
        this._apiEndpoints = {
            'genres': `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
            'popular': `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`,
            'search': `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&include_adult=false&query=`,
        };
    }

    fetchMovies = async (endpoint, query = '') => {
        this.moviesFetching = true;
        const response = await fetch(this._apiEndpoints[endpoint] + query);
        const data = await response.json();
        this.moviesList = data.results;
        this.totalPages = data.totalPages;
        this.moviesFetching = false;
    };

    fetchGenres = async () => {
        const response = await fetch(this._apiEndpoints['genres']);
        const {genres} = await response.json();
        genres.forEach(genre => {
            const {id, name} = genre;
            this.genres[id] = name;
        });
    }

    initialDataFetching = async () => {
        await this.fetchGenres();
        await this.fetchMovies('popular');
    }

};

export default MoviesModel;