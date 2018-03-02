# RDBMS-backed Film Explorer Server

A server for the CS312 film-explorer example backed by a RDBMS (e.g. sqlite3). This server demonstrates the use of an ORM, [Objection.js](http://vincit.github.io/objection.js/) with associations.

The multiple genres for a movie are represented as a HasMany relation to the `Genre` table. The corresponding names for the genres can be found in the `genres.json` file. A virtual attribute reconstructs the original `genre_ids` array in the source JSON file (as would be returned by the MongoDB server).

The movie data was sourced from [themoviedb](https://www.themoviedb.org).

## Running

Launch server with `npm run start`. By default the application is available at <http://localhost:5042>.

## Setup

Run `npm install` to install the dependencies. To create the database run the included migration:

```
npx knex migrate:latest
```

The repository includes some sample data to seed the database. To do so, run the included seed script:

```
npx knex seed:run
```

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
