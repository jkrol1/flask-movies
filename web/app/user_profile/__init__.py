from flask import Blueprint

user_profile = Blueprint(
    "user_profile",
    __name__,
    static_folder="static",
    static_url_path="/static",
    template_folder="templates",
)

from . import views
