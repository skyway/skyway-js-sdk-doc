# How to serve this on localhost

We recommend to use [pipenv](https://github.com/pypa/pipenv).

1. Run `pipenv install` to resolve dependencies
2. Run `pipenv run python -m mkdocs serve`, then access to http://localhost:8000

# Install modules without pipenv

If you're not using `pipenv` to manage packages, generate requirements.txt and use it.

```
pipenv lock -r > requirements.txt
pip install -r requirements.txt
```

# How to deploy

Push a commit to master branch and the documentation will be updated automatically.
