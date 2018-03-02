# Memory-backed Film Explorer Server

An in-memory server for the CS312 film-explorer without a persistence layer. The movie data was sourced from [themoviedb](https://www.themoviedb.org).

## Setup

Run `npm install` to install the dependencies.

## Running

Launch the application server with `npm run start`. By default the application is available at <http://localhost:3001>.

## Development

### Linting with ESLint

The server is configured with the aggressive [AirBnB ESLint rules](https://github.com/airbnb/javascript). You can run the linter with `npm run lint` or `npx eslint .`. Thee rules were installed with:

```
npx install-peerdeps --dev eslint-config-airbnb-base
```

and `.eslintrc.json` configured with:

```
{
  "extends": "airbnb-base"
}
```

The linter can be run with `npx eslint .` (or via `npm run lint`). Include the `--fix` option to `eslint` to automatically fix many formatting errors.
