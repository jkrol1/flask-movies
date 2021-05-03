from flask import render_template, redirect, url_for, current_app, request, abort
from flask_login import current_user

from . import movie
from .forms import CommentForm
from ..models import Comment
from .. import db


@movie.route("/<int:movie_id>", methods=["GET", "POST"])
def movie_page(movie_id):

    comments = Comment.query.filter_by(movie_id=movie_id)

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

    page = request.args.get("page", 1, type=int)

    if page == -1:
        page = (comments.count() - 1) // current_app.config["COMMENTS_PER_PAGE"] + 1

    pagination = comments.order_by(Comment.timestamp.asc()).paginate(
        page, per_page=current_app.config["COMMENTS_PER_PAGE"], error_out=False
    )

    comments_on_page = pagination.items

    return render_template(
        "movie/movie.html",
        form=form,
        comments=comments_on_page,
        pagination=pagination,
        movie_id=movie_id,
    )


@movie.route("/<int:movie_id>/like/<event>")
def like_event(movie_id, event):
    if event == "like":
        current_user.like_movie(movie_id)
        return redirect(url_for(".movie_page", movie_id=movie_id))
    elif event == "unlike":
        current_user.unlike_movie(movie_id)
        return redirect(url_for(".movie_page", movie_id=movie_id))
    else:
        abort(404)