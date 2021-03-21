const elements = {
    movieBackground: document.querySelector('.movie-background'),
    movieOverview: document.querySelector('.movie-overview'),
    movieActors: document.querySelector('.movie-actors'),
    carouselInner: document.querySelector('.carousel-inner'),
    movieRecommendations: document.querySelector('.movie-recommendations')
};

const parseGenres = genresArray => (
    genresArray.map(item => item.name).join(', ')
);

const renderMovieBackground = movie => {
    elements.movieBackground.style.backgroundImage =
        `url(http://image.tmdb.org/t/p/w1280${movie.backdrop_path})`;
};

const renderMovieOverview = movie => {
    const movieOverviewHtml = `<div class="row pb-3 justify-content-center movie-overview-row">
                                    <img class="col-md-4 col-lg-3 rounded p-0 mt-5 shadow movie-poster" src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" alt="">
                                    <div class="col-md mt-5 container-fluid w-md-50 position-static movie-overview-info">
                                        <h3 class="mb-4 display-4">${movie.title}</h3>
                                        <p>${movie.overview}</p>
                                        <table class="mt-4 table table-striped">
                                            <tbody class="rounded">
                                                <tr>
                                                    <th scope="row">Release date</th>
                                                    <td>${movie.release_date}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Genres</th>
                                                    <td>${parseGenres(movie.genres)}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Runtime</th>
                                                    <td>${movie.runtime}m</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Revenue</th>
                                                    <td>${movie.revenue}$</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Budget</th>
                                                    <td>${movie.budget}$</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="movie-vote-average"><span>${movie.vote_average}</span></div>
                                    </div>
                                </div>`;

    elements.movieOverview.insertAdjacentHTML('afterbegin', movieOverviewHtml);
}
const createActorHtml = actor => (`<div class="card m-2 shadow">
                                        <img class="card-img-top" src="https://image.tmdb.org/t/p/w300/${actor.profile_path}" alt="Card image">
                                        <div class="card-body p-2 justify-content-center">
                                            <h6 class="card-title text-center text-white">${actor.character}</h5>
                                            <p class="card-text text-center text-white">${actor.original_name}</p>
                                        </div>
                                    </div>`);

const renderActors = actors => {
    actors.forEach(actor => elements
        .movieActors
        .insertAdjacentHTML('beforeend', createActorHtml(actor)));
};

const createImageHtml = (image, active = false) => (`<div class="carousel-item ${active ? 'active' : ''}">
                                                        <img class="d-block w-100" src="https://image.tmdb.org/t/p/w1280/${image.file_path}" alt="Image">
                                                    </div>`);

const renderImages = images => {
    images.forEach((image, index) => {

        let imageHtml;

        if (index === 0) {
            imageHtml = createImageHtml(image, true);
        } else {
            imageHtml = createImageHtml(image);
        };

        elements
            .carouselInner
            .insertAdjacentHTML('beforeend', imageHtml);
    });
}

const createRecommendedMovieHtml = movie => (`<div class="card m-2 shadow">
                                                    <img class="card-img-top" src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" alt="Card image">
                                                    <div class="card-body p-2 justify-content-center">
                                                        <h6 class="card-title text-center text-white">${movie.title}</h5>
                                                    </div>
                                                </div>`
);

const renderRecommendedMovies = recommendedMovies => {
    recommendedMovies.forEach(recommendedMovie => elements
        .movieRecommendations
        .insertAdjacentHTML('beforeend', createRecommendedMovieHtml(recommendedMovie)));
};

const renderView = (movie, actors, recommendations, images) => {
    renderMovieBackground(movie);
    renderMovieOverview(movie);
    renderActors(actors);
    renderImages(images);
    renderRecommendedMovies(recommendations);
};

export default renderView;