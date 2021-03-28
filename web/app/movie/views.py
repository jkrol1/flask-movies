from flask import render_template, redirect, url_for
from flask_login import current_user

from . import movie
from .forms import CommentForm
from ..models import Comment
from .. import db


@movie.route("/<int:movie_id>", methods=["GET", "POST"])
def movie_page(movie_id):

    form = CommentForm()

    if form.validate_on_submit():
        comment = Comment(
            body=form.body.data,
            movie_id=movie_id,
            author=current_user._get_current_object(),
        )

        db.session.add(comment)
        db.session.commit()

        return redirect(url_for(".movie_page", movie_id=movie_id, page=-1))

    return render_template("movie/movie.html", form=form)
