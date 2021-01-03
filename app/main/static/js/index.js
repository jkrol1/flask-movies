var API_KEY = '9cecfc565596623dc9215b62a88cd003'

function insertFeaturedMovie(movie) {

    var featuredMovieBackground = '<div class="featured-movie" \
                        style="background-image: url(http://image.tmdb.org/t/p/w1280' + movie.backdrop_path + ')"></div>';

    var featuredMovieInfo = '<div class="featured-movie__info container"> \
                                <h2 class="featured-movie__title">'+ movie.title + '</h2> \
                                <p class="featured-movie__description">'+ movie.overview + '</p> \
                                </div>'

    $(featuredMovieBackground).insertAfter('.header').hide().fadeIn(1000, function () {
        $('.featured-movie').append(featuredMovieInfo);
    });
};

$(function () {
    $.ajax({
        url: 'https://api.themoviedb.org/3/trending/all/week?api_key=' + API_KEY,
        type: 'GET',
        success: function (response) {
            console.log(response);
            insertFeaturedMovie(response.results[0]);
        },
        error: function (error) {
            console.log(error);
        }
    });
});

