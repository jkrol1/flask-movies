from flask import render_template, request

from . import auth
from .forms import LoginForm


@auth.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        print("Validated")
    return render_template("auth/login.html", form=form)
