# MongoDB-backed Film Explorer Server

A server for the CS312 film-explorer example backed by MongoDB. The movie data was sourced from [themoviedb](https://www.themoviedb.org).

## Setup

Run `npm install` to install the dependencies and create a `./data` directory (as a "postinstall" script) for use by MongoDB.

The repository includes some sample data to seed the database. To seed the database, first start the database in one terminal with `npm run mongo` (which is equivalent to `mongod --config mongod.conf`) and then in a second terminal import the seed data with

```
mongoimport --db film-explorer --collection movies --jsonArray movies.json --port 5000
```

## Running

Concurrently launch the MongoDB server and application server with `npm run start`. This will start the database (equivalent to `mongod --config mongod.conf`) and the application server (equivalent to `node index.js`). By default the application is available at <http://localhost:3001>.

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
