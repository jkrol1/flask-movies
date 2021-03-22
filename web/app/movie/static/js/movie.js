import getMovieData from './movie-data.js';
import renderView from './movie-view.js';

const url = window.location.href;

const id = url.slice(url.search('(?<=movie/)'), url.length);

const {
    movie,
    actors,
    recommendations,
    images } = await getMovieData(id);

renderView(
    movie,
    actors.cast.slice(0, 10),
    recommendations.results,
    images.backdrops);