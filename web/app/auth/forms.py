from flask_wtf import FlaskForm
from wtforms import BooleanField, PasswordField, StringField
from wtforms.validators import (
    InputRequired,
    Length,
    Email,
    Regexp,
    EqualTo,
    ValidationError,
)

from ..models import User


class LoginForm(FlaskForm):
    email = StringField("Email", validators=[InputRequired(), Email()])
    password = PasswordField("Password", validators=[Length(min=8), InputRequired()])
    remember_me = BooleanField("Keep me logged in")


class RegistrationForm(FlaskForm):
    email = StringField("Email", validators=[InputRequired(), Email()])
    username = StringField(
        "Username",
        validators=[
            InputRequired(),
            Regexp(
                "^[A-Za-z][A-Za-z0-9_.]*$",
                0,
                "Username must start with letter and be combination of letters"
                ", numbers, dots and underscores",
            ),
        ],
    )
    password = PasswordField("Password", validators=[Length(min=8), InputRequired()])
    password_confirmation = PasswordField(
        "Confirm password", validators=[EqualTo("password")]
    )

    def validate_email(self, field):
        if User.query.filter_by(email=field.data).first():
            raise ValidationError("Email already exists")

    def validate_username(self, field):
        if User.query.filter_by(username=field.data).first():
            raise ValidationError("Username already exists")
