import getMovieData from './movie-data.js';
import renderView from './movie-view.js';

const url = window.location.href;

const id = url.match('(?<=movie/)[0-9]*')[0];

const {
    movie,
    actors,
    recommendations,
    images } = await getMovieData(id);

renderView(
    movie,
    actors.cast,
    recommendations.results,
    images.backdrops);