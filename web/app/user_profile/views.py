from flask import render_template, redirect, flash, url_for
from flask_login import current_user

from . import user_profile
from .forms import EditProfileForm
from ..models import User
from .. import db


@user_profile.route("/<int:user_id>")
def profile(user_id):
    user = User.query.filter_by(id=user_id).first_or_404()

    return render_template("user_profile/profile.html", user=user)


@user_profile.route("/edit", methods=["GET", "POST"])
def edit_profile():
    form = EditProfileForm()

    if form.validate_on_submit():
        current_user.name = form.name.data
        current_user.location = form.location.data
        current_user.about_me = form.about_me.data
        db.session.add(current_user._get_current_object())
        db.session.commit()
        flash("Your profile has been updated", "alert-success")
        return redirect(url_for(".profile", username=current_user.username))

    form.name.data = current_user.name
    form.location.data = current_user.location
    form.about_me.data = current_user.about_me

    return render_template("user_profile/edit_profile.html", form=form)
