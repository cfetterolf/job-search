# Film Explorer client

The film-explorer client was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) (CRA) and includes all of capabilities provided by CRA. Some built-in functionality of that skeleton was stripped out, specifically the [offline caching](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app).

## Setup

Run `npm install` to install the dependencies.

The development server will attempt to proxy API requests to the server specified in the `package.json` "proxy" field. Update that field to point a running server.

## Development

### Testing

The tests use both Jest and Enzyme has described in the [CRA documentation](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests).

Enzyme was installed with:

```
npm install --save-dev enzyme enzyme-adapter-react-16 react-test-renderer
```

### Linting with ESLint

The lint configuration built into CRA was extended with the AirBnB configuration based on this [blog post](https://groundberry.github.io/development/2017/06/11/create-react-app-linting-all-the-things.html). Using ESLint outside of `react-scripts` may not be supported, but appears to work.

The configuration was installed with:

```
npx install-peerdeps --dev eslint-config-airbnb
```

And the client .eslintrc.json file configured to use the AirBnB rules, and globally configured to allow JSX in .js files.

```
{
  "extends": "airbnb",
  "env": {
    "browser": true,
    "jest": true
  },
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  }
}
```

Other rules are disabled in specific files.

The linter is run automatically by the CRA development server, or can be run manually with `npx eslint .` (or via `npm run lint`). Include the `--fix` option to `eslint` to automatically fix many formatting errors.
