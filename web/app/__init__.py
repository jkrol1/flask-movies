from flask import Flask
from flask_login import LoginManager
from flask_mail import Mail
from flask_migrate import Migrate
from flask_moment import Moment
from flask_sqlalchemy import SQLAlchemy

from config import config

db = SQLAlchemy()
mail = Mail()
migrate = Migrate()
moment = Moment()
login_manager = LoginManager()
login_manager.login_view = "auth.login"

from app.models import User, Role, Comment


def create_app(config_name):

    # Initialize app
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    # Add extensions
    db.init_app(app)
    mail.init_app(app)
    migrate.init_app(app, db)
    moment.init_app(app)
    login_manager.init_app(app)

    # Register blueprints
    from .main import main as main_blueprint
    from .auth import auth as auth_blueprint
    from .movie import movie as movie_blueprint
    from .user_profile import user_profile as user_profile_blueprint

    app.register_blueprint(main_blueprint)
    app.register_blueprint(auth_blueprint, url_prefix="/auth")
    app.register_blueprint(movie_blueprint, url_prefix="/movie")
    app.register_blueprint(user_profile_blueprint, url_prefix="/user-profile")

    return app
