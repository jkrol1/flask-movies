from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.fields.html5 import EmailField
from wtforms.validators import (
    InputRequired,
    Length,
    Email,
    Regexp,
    EqualTo,
)


class LoginForm(FlaskForm):
    email = EmailField("Email", validators=[InputRequired(), Email()])
    password = PasswordField(
        "Password", validators=[Length(min=1, max=5), InputRequired()]
    )
