from flask import render_template
from . import movie


@movie.route("/<movie_id>")
def movie_page(movie_id):
    return render_template("movie/movie.html")
