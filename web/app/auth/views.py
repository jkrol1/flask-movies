from flask import render_template, request, redirect, flash, url_for
from flask_login import login_user, logout_user, login_required, current_user

from . import auth
from .forms import LoginForm, RegistrationForm
from .. import db
from ..email import send_email
from ..models import User


@auth.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():

        # Get user from db
        user = User.query.filter_by(email=form.email.data).first()

        if user is not None and user.check_password(form.password.data):

            # Login user and place long-term cookie if remember_me is True
            login_user(user, form.remember_me.data)

            next = request.args.get("next")
            if next is None or not next.startswith("/"):
                next = url_for("main.index")
            return redirect(next)

        flash("Invalid username or password", "alert-danger")

    return render_template("auth/login.html", form=form)


@auth.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("main.index"))


@auth.route("/register", methods=["GET", "POST"])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(
            email=form.email.data,
            username=form.username.data,
            password=form.password.data,
        )

        db.session.add(user)
        db.session.commit()

        token = user.generate_confirmation_token()

        send_email(
            user.email,
            "Confirm your email",
            "auth/confirmation_email",
            user=user,
            token=token,
        )

        flash("Confirmation email has been sent to you by Email", "alert-success")
        return redirect(url_for("auth.login"))

    return render_template("auth/register.html", form=form)


@auth.route("/confirm/<token>")
@login_required
def confirm(token):
    if current_user.confirmed:
        return redirect(url_for("main.index"))
    if current_user.confirm(token):
        flash("Your account has been successfully confirmed", "alert-success")
    else:
        flash("Your token is invalid or has expired", "alert-danger")
    return redirect(url_for("auth.login"))


@auth.before_app_request
def before_request():

    if current_user.is_authenticated:
        current_user.ping()
        if (
            current_user.is_authenticated
            and not current_user.confirmed
            and request.blueprint != "auth"
            and request.endpoint != "static"
        ):
            return redirect(url_for("auth.unconfirmed"))


@auth.route("/unconfirmed")
def unconfirmed():
    if current_user.is_anonymous or current_user.confirmed:
        return redirect(url_for("main.index"))
    return render_template("auth/unconfirmed.html")


@auth.route("/resend-confirmation")
@login_required
def resend_confirmation():
    if current_user.confirmed:
        return redirect("main.index")
    token = current_user.generate_confirmation_token()
    send_email(
        current_user.email,
        "Confirm your email",
        "auth/confirmation_email",
        user=current_user,
        token=token,
    )
    flash("Confirmation token has been sent", "alert-success")
    return redirect(url_for("auth.login"))
