from flask_wtf import FlaskForm
from wtforms import BooleanField, PasswordField, SubmitField, StringField
from wtforms.validators import (
    InputRequired,
    Length,
    Email,
    Regexp,
    EqualTo,
)


class LoginForm(FlaskForm):
    email = StringField("Email", validators=[InputRequired(), Email()])
    password = PasswordField("Password", validators=[Length(min=7), InputRequired()])
    remember_me = BooleanField("Keep me logged in")