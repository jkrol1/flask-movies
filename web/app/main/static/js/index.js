import MoviesModel from './movies-model.js';
import MoviesView from './movies-view.js';
import MoviesController from './movies-controller.js';

/*

var app = {
    page: 1,
    numberOfPages: 1,
    category: 'popular', // possible options popular, search
    searchQuery: '',
    fetching: false,
    genres: {},
};

var apiEndpoints = {
    'genres': 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY,
    'popular': 'https://api.themoviedb.org/3/trending/movie/week?api_key=' + API_KEY,
    'search': 'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY +
        '&language=en-US&include_adult=false&query=',
};


function delay(callback, ms) {
    var timer = 0;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}

function parseGenresResponse(genresResponse) {
    for (var i = 0; i < genresResponse.length; i++) {
        app.genres[genresResponse[i]["id"]] = genresResponse[i]["name"]
    }
    ;
};

function renderFeaturedMovie(movie) {

    var featuredMovie = $('.featured-movie');

    featuredMovie.css('background-image', 'url(http://image.tmdb.org/t/p/w1280' + movie.backdrop_path + ')');

    var featuredMovieInfo = '<div class="featured-movie__info container"> \
                                <h2 class="featured-movie__title">' + movie.title + '</h2> \
                                <p class="featured-movie__description">' + movie.overview + '</p> \
                            </div>'

    featuredMovie.insertAfter('.header').hide().fadeIn(350, function () {
        featuredMovie.append(featuredMovieInfo);
    });
};

function genreIdToText(genresArray) {
    genresArray = genresArray.map(genre => app.genres[Number(genre)]);
    return genresArray.join(', ');
};

function createMoviesCards(movies) {

    var moviesCards = [];

    // iterate over movies array
    for (var i = 0; i < movies.length; i++) {

        var movie = movies[i];

        if (!movie.poster_path) {
            var poster_path = "main/static/assets/not_available.jpg";
        } else {
            var poster_path = 'https://image.tmdb.org/t/p/w300/' + movie.poster_path;
        }

        var movieCard = '<div class="movie-card card mt-5"> \
                <img class="card-img-top" src="' + poster_path + '">\
                <div class="card-body position-relative"> \
                    <h6 class="card-title">' + movie.title + '</h4> \
                    <p class="card-text">' + genreIdToText(movie.genre_ids) + '</p> \
                    <span class="movie-mark"><p class="my-0">' + movie.vote_average + '</p></span> \
                </div >\
            </div > ';

        moviesCards.push($(movieCard));

    }
    ;

    return moviesCards;
};

function renderSearchResults(movies) {

    $('.search-results').append(createMoviesCards(movies))
        .hide()
        .fadeIn(500);

};

function removePreviousResults() {
    $('.search-results').empty();
};


$(function () {


    $.when(
        $.ajax({
            url: apiEndpoints['genres'],
            type: 'GET',
            success: function (response) {
                parseGenresResponse(response.genres);
            },
            error: function (error) {
                console.log(error);
            }
        }),
        $.ajax({
            url: apiEndpoints[app.category],
            type: 'GET',
            success: function (response) {
                onMoviesAjaxSuccess(response);
                renderFeaturedMovie(response.results[0]);
                $('.search-results').css('min-height', $('.search-results').height());
            },
            error: onMoviesAjaxError
        }));
});

function onMoviesAjaxSuccess(response, page = 1) {
    removePreviousResults();
    app.page = 1;
    app.numberOfPages = response.total_pages;
    renderSearchResults(response.results);
};

function onMoviesAjaxError(error) {
    console.log(error);
};

function ajaxRequest(url, type) {
    return $.ajax({
        url: url,
        type: type,
        success: onMoviesAjaxSuccess,
        error: onMoviesAjaxError
    });
};

$('.search__input').keyup(delay(function () {

    app.searchQuery = this.value;

    if (app.searchQuery === '') {
        app.category = 'popular';
        ajaxRequest(apiEndpoints[app.category], 'GET');

    } else {
        app.category = 'search';
        ajaxRequest(apiEndpoints[app.category] + app.searchQuery, 'GET');

    }

}, 350));

function appendNextMoviesPage(response) {
    $('.search-results').append(createMoviesCards(response.results))
        .fadeIn(500);
    app.fetching = false;
    document.querySelector('.fetching-info').classList.toggle('d-none');
};

$(window).scroll(function () {
    var lastListedMovie = $('.movie-card:last-child')[0];
    var twentiethListedMovie = $('.movie-card:nth-of-type(20)')[0];
    var LastListedMovieRect = lastListedMovie.getBoundingClientRect();
    var twentiethListedMovieRect = twentiethListedMovie.getBoundingClientRect();
    if (LastListedMovieRect.top - $(window)[0].innerHeight < 0) {
        if (app.page < app.numberOfPages && app.fetching === false) {
            app.page += 1;
            app.fetching = true;
            document.querySelector('.fetching-info').classList.toggle('d-none');
            $.ajax({
                url: apiEndpoints[app.category] + app.searchQuery + '&page=' + app.page,
                type: 'GET',
                success: delay(appendNextMoviesPage, 1000),
                error: onMoviesAjaxError
            });
        }

    }
    const scrollToTop = $('.scroll-to-top')[0];
    if (twentiethListedMovieRect.top - $(window)[0].innerHeight < 0) {
        if (!scrollToTop.classList.contains('show')) scrollToTop.classList.add('show');
    } else {
        if (scrollToTop.classList.contains('show')) scrollToTop.classList.remove('show');
    }
});

document.querySelector('.scroll-to-top').addEventListener('click', () => {

    const search = document.querySelector('.search');

    window.scrollTo({
        top: search.offsetTop - search.offsetHeight - 20,
        left: 0,
        behavior: 'smooth',
    });
});
*/

const controller = new MoviesController(new MoviesModel(), new MoviesView());
window.controller = controller;