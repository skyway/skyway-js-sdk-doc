# How to serve this on localhost

We require [pipenv](https://github.com/pypa/pipenv) to serve this documentaiton.

1. (If you do not have `pipenv` yet) Run `pip install pipenv` to install `pipenv`.
2. Run `pipenv install` to resolve dependencies.
3. Run `pipenv run python -m mkdocs serve`, then access to http://localhost:8000

# How to deploy

Push a commit to master branch and the documentation will be updated automatically.
