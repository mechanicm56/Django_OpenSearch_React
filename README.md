# Django React OpenSearch

## About

A [Django](https://www.djangoproject.com/) project with a multitude of state-of-the-art libraries and tools. If pairing Django with React is a possibility for your project or spinoff, this is the best solution available. Save time with tools like:

-   [React](https://react.dev/), for building interactive UIs
-   [TypeScript](https://www.typescriptlang.org/), for static type checking
-   [Poetry](https://python-poetry.org/), for managing the environment and its dependencies
-   [django-js-reverse](https://github.com/vintasoftware/django-js-reverse), for generating URLs on JS
-   [Material UI](https://mui.com/), for responsive styling
-   [Webpack](https://webpack.js.org/), for bundling static assets
-   [Celery](https://docs.celeryq.dev/en/stable/), for background worker tasks
-   [WhiteNoise](https://whitenoise.readthedocs.io/en/stable/) with [brotlipy](https://github.com/python-hyper/brotlicffi), for efficient static files serving
-   [ruff](https://github.com/astral-sh/ruff) and [ESLint](https://eslint.org/) with [pre-commit](https://pre-commit.com/) for automated quality assurance (does not replace proper testing!)

For continuous integration, a [Github Action](https://github.com/features/actions) configuration `.github/workflows/main.yml` is included.

Also, includes a Render.com `render.yaml` and a working Django `production.py` settings, enabling easy deployments with ['Deploy to Render' button](https://render.com/docs/deploy-to-render). The `render.yaml` includes the following:

-   PostgreSQL, for DB
-   Redis, for Celery

## Features Catalogue

### Frontend

-   `react` for building interactive UIs
-   `react-dom` for rendering the UI
-   `react-router` for page navigation
-   `webpack` for bundling static assets
-   `webpack-bundle-tracker` for providing the bundled assets to Django
-   Styling
    -   `mui` for providing components
    -   `sass` for providing compatibility with SCSS files
-   State management and backend integration
    -   `axios` for performing asynchronous calls
    -   `cookie` for easy integration with Django using the `csrftoken` cookie
    -   `openapi-ts` for generating TypeScript client API code from the backend OpenAPI schema
    -   `history` for providing browser history to Connected React Router
-   Utilities
    -   `lodash` for general utility functions
    -   `classnames` for easy working with complex CSS class names on components
    -   `react-refresh` for improving QoL while developing through automatic browser refreshing

### Backend

-   `django` for building backend logic using Python
-   `djangorestframework` for building a REST API on top of Django
-   `drf-spectacular` for generating an OpenAPI schema for the Django REST API
-   `django-webpack-loader` for rendering the bundled frontend assets
-   `django-js-reverse` for easy handling of Django URLs on JS
-   `django-upgrade` for automatically upgrading Django code to the target version on pre-commit
-   `django-guid` for adding a unique correlation ID to log messages from Django requests
-   `psycopg` for using PostgreSQL database
-   `sentry-sdk` for error monitoring
-   `python-decouple` for reading environment variables on settings files
-   `celery` for background worker tasks
-   `django-csp` for setting the draft security HTTP header Content-Security-Policy
-   `django-permissions-policy` for setting the draft security HTTP header Permissions-Policy
-   `django-defender` for blocking brute force attacks against login
-   `whitenoise` and `brotlipy` for serving static assets

### Setup

-   Do the following:
    -   Create a git-untracked `local.py` settings file:
        `cp backend/{{project_name}}/settings/local.py.example backend/{{project_name}}/settings/local.py`
    -   Create a git-untracked `.env.example` file:
        `cp backend/.env.example backend/.env`

#### Setup the backend app

-   Open the `backend/.env` file on a text editor and do one of the following:
    -   If you wish to use SQLite locally, uncomment the line `DATABASE_URL=sqlite:///db.sqlite3`
    -   If you wish to use PostgreSQL locally, uncomment and edit the line `DATABASE_URL=postgres://{{project_name}}:password@db:5432/{{project_name}}` in order to make it correctly point to your database URL
        -   The url format is the following: `postgres://USER:PASSWORD@HOST:PORT/NAME`
    -   If you wish to use another database engine locally, add a new `DATABASE_URL` setting for the database you wish to use
        -   Please refer to [dj-database-url](https://github.com/jazzband/dj-database-url#url-schema) on how to configure `DATABASE_URL` for commonly used engines
-   Open a new command line window and go to the project's directory
-   Run `poetry install`

#### Run the backend app

-   Go to the `backend` directory
-   Create the migrations for `users` app:
    `poetry run python manage.py makemigrations`
-   Run the migrations:
    `poetry run python manage.py migrate`
-   Generate the OpenAPI schema:
    `poetry run python manage.py spectacular --color --file schema.yml`
-   Run the project:
    `poetry run python manage.py runserver`

#### Setup and run the frontend app

-   Open a new command line window and go to the project's directory
-   `npm install`
-   `npm run openapi-ts`
    -   This is used to generate the TypeScript client API code from the backend OpenAPI schema
-   `npm run dev`
    -   This is used to serve the frontend assets to be consumed by [django-webpack-loader](https://github.com/django-webpack/django-webpack-loader) and not to run the React application as usual, so don't worry if you try to check what's running on port 3000 and see an error on your browser
-   Open a browser and go to `http://localhost:8000` to see the project running

#### Setup Celery

-   `poetry run celery --app={{project_name}} worker --loglevel=info`

### Testing

`make test`

Will run django tests using `--keepdb` and `--parallel`. You may pass a path to the desired test module in the make command. E.g.:

`make test someapp.tests.test_views`

### Adding new pypi libs

To add a new **backend** dependency, run `poetry add {dependency}`. If the dependency should be only available for development user append `-G dev` to the command.`

## Production Deployment

### Setup

This project comes with an `render.yaml` file, which can be used to create an app on Render.com from a GitHub repository.

Before deploying, please make sure you've generated an up-to-date `poetry.lock` file containing the Python dependencies. This is necessary even if you've used Docker for local runs. Do so by following [these instructions](#setup-the-backend-app).

After setting up the project, you can init a repository and push it on GitHub. If your repository is public, you can use the following button:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

If you are in a private repository, access the following link replacing `$YOUR_REPOSITORY_URL$` with your repository link.

-   `https://render.com/deploy?repo=$YOUR_REPOSITORY_URL$`

Keep reading to learn how to configure the prompted environment variables.

#### `ALLOWED_HOSTS`

Chances are your project name isn't unique in Render, and you'll get a randomized suffix as your full app URL like: `https://{{project_name}}-a1b2.onrender.com`.

But this will only happen after the first deploy, so you are not able to properly fill `ALLOWED_HOSTS` yet. Simply set it to `*` then fix it later to something like `{{project_name}}-a1b2.onrender.com` and your domain name like `example.org`.

#### `ENABLE_DJANGO_COLLECTSTATIC`

Default is 1, meaning the build script will run collectstatic during deploys.

#### `AUTO_MIGRATE`

Default is 1, meaning the build script will run collectstatic during deploys.

### Build script

By default, the project will always run the `render_build.sh` script during deployments. This script does the following:

1.  Build the frontend
2.  Build the backend
3.  Run Django checks
4.  Run `collectstatic`
5.  Run Django migrations
6.  Push frontend source maps to Sentry

### Celery

As there aren't free plans for Workers in Render.com, the configuration for Celery workers/beat will be commented by default in the `render.yaml`. This means celery won't be available by default.

Uncommenting the worker configuration lines on `render.yaml` will imply in costs.

### SendGrid

To enable sending emails from your application you'll need to have a valid SendGrid account and also a valid verified sender identity. After finishing the validation process you'll be able to generate the API credentials and define the `SENDGRID_USERNAME` and `SENDGRID_PASSWORD` environment variables on Render.com.

These variables are required for your application to work on Render.com since it's pre-configured to automatically email admins when the application is unable to handle errors gracefully.

### Media storage

Media files integration with S3 or similar is not supported yet. Please feel free to contribute!

### Sentry

[Sentry](https://sentry.io) is already set up on the project. For production, add `SENTRY_DSN` environment variable on Render.com, with your Sentry DSN as the value.

You can test your Sentry configuration by deploying the boilerplate with the sample page and clicking on the corresponding button.

### Sentry source maps for JS files

The `render_build.sh` script has a step to push Javascript source maps to Sentry, however some environment variables need to be set on Render.com.

The environment variables that need to be set are:

-   `SENTRY_ORG` - Name of the Sentry Organization that owns your Sentry Project.
-   `SENTRY_PROJECT_NAME` - Name of the Sentry Project.
-   `SENTRY_API_KEY` - Sentry API key that needs to be generated on Sentry. [You can find or create authentication tokens within Sentry](https://sentry.io/api/).

After enabling dyno metadata and setting the environment variables, your next Render.com Deploys will create a release on Sentry where the release name is the commit SHA, and it will push the source maps to it.

## Linting

-   At pre-commit time (see below)
-   Manually with `poetry run ruff` and `npm run lint` on project root.
-   During development with an editor compatible with ruff and ESLint.