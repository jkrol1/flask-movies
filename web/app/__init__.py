from flask import Flask
from config import config


def create_app(config_name):

    # Initialize app
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    # Add extensions

    # Register blueprints
    from .main import main as main_blueprint

    app.register_blueprint(main_blueprint)

    return app