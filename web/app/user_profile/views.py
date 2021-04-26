from flask import render_template
from . import user_profile


@user_profile.route("/<int:user_id>")
def profile(user_id):
    return render_template("user_profile/profile.html", user_id=user_id)
