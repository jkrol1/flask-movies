# pull official base image
FROM python:3.8.1-slim-buster

# create directory for the app user
RUN mkdir -p /home/app

# create the app user
RUN addgroup -S app && adduser -S app -G app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV APP_HOME=/home/app/web

# create the appropriate directories
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc

# copy project
COPY . $APP_HOME	

# install pipenv
RUN pip install pipenv

# install python packages
RUN pipenv install --system --deploy

# chown all the files to the app user
RUN chown -R app:app $APP_HOME

# change to the app user
USER app
