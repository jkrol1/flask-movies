from flask import Blueprint

movie = Blueprint(
    "movie",
    __name__,
    static_folder="static",
    static_url_path="/static",
    template_folder="templates",
)

from . import views
