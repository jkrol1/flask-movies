from flask import Blueprint

auth = Blueprint(
    "auth",
    __name__,
    static_folder="static",
    static_url_path="/static",
    template_folder="templates",
)

from . import views