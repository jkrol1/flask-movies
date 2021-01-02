from flask import Flask
from flask_bootstrap import Bootstrap
from config import config

bootstrap = Bootstrap()


def create_app(config_name):

    # Initialize app
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    # Add extensions
    bootstrap.init_app(app)

    # Register blueprints

    return app