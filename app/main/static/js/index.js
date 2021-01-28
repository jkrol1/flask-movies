var API_KEY = '9cecfc565596623dc9215b62a88cd003'

var app = {
    columnsPerRow: 5,
    initialMoviesList: [],
    genres: {},
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
    };
};

function renderFeaturedMovie(movie) {

    var featuredMovie = $('.featured-movie');

    featuredMovie.css('background-image', 'url(http://image.tmdb.org/t/p/w1280' + movie.backdrop_path + ')');

    var featuredMovieInfo = '<div class="featured-movie__info container"> \
                                <h2 class="featured-movie__title">'+ movie.title + '</h2> \
                                <p class="featured-movie__description">'+ movie.overview + '</p> \
                            </div>'

    featuredMovie.insertAfter('.header').hide().fadeIn(1000, function () {
        featuredMovie.append(featuredMovieInfo);
    });
};

function createMoviesCards(movies) {

    var moviesCards = [];

    // iterate over movies array
    for (var i = 0; i < movies.length; i++) {

        movie = movies[i];

        var movieCard = '<div class="card mt-4"> \
                <img class="card-img-top" src="https://image.tmdb.org/t/p/w300/' + movie.poster_path + '">\
                <div class="card-body"> \
                    <h6 class="card-title">'+ movie.title + '</h4> \
                </div >\
            </div > ';

        moviesCards.push($(movieCard));

    };

    return moviesCards;
};

function renderSearchResults(movies) {

    // Create container element
    var containerElement = $('<div class="search-results container d-flex justify-content-around flex-wrap"></div');

    // 
    containerElement.html(createMoviesCards(movies));

    $('main.container').append(containerElement
        .hide()
        .fadeIn(500));

};

function removePreviousResults() {
    $('.search-results').remove();
};



$(function () {


    $.when(
        $.ajax({
            url: 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY,
            type: 'GET',
            success: function (response) {
                parseGenresResponse(response.genres);
            },
            error: function (error) {
                console.log(error);
            }
        }),
        $.ajax({
            url: 'https://api.themoviedb.org/3/trending/movie/week?api_key=' + API_KEY,
            type: 'GET',
            success: function (response) {
                app.initialMoviesList = response.results
                renderFeaturedMovie(app.initialMoviesList[0]);
                renderSearchResults(app.initialMoviesList);
                $('.search-results').css('min-height', $('.search-results').height());

            },
            error: function (error) {
                console.log(error);
            }
        }));
});

$('.search__input').keyup(delay(function () {

    var query = this.value;

    if (query === '') {
        removePreviousResults();
        renderSearchResults(app.initialMoviesList);

    } else {
        $.ajax({
            url: 'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&language=en-US&page=1&include_adult=false&query=' + query,
            type: 'GET',
            success: function (response) {
                removePreviousResults();
                renderSearchResults(response.results);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
}, 500));


