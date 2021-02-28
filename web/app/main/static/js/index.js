import MoviesModel from './movies-model.js';
import MoviesView from './movies-view.js';
import MoviesController from './movies-controller.js';

const controller = new MoviesController(new MoviesModel(), new MoviesView());
