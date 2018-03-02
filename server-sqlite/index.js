/* eslint-disable no-console */
/* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const http = require('http');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);

const { Model } = require('objection');
const Movie = require('./models/Movie');

// Bind all Models to a knex instance.
Model.knex(knex);

const app = express();

// express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // Resolve client build directory as absolute path to avoid errors in express
  const path = require('path'); // eslint-disable-line global-require
  const buildPath = path.resolve(__dirname, '../client/build');

  app.use(express.static(buildPath));

  app.get('/', (request, response) => {
    response.sendFile(path.join(buildPath, 'index.html'));
  });
}

const corsOptions = {
  methods: ['GET', 'PUT', 'POST'],
  origin: '*',
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/api/movies', (request, response) => {
  Movie.query().eager('[genres]').then((movies) => {
    response.send(movies);
  });
});

app.get('/api/movies/:id', (request, response) => {
  Movie.query().findById(request.params.id).eager('[genres]').then((movie) => {
    response.send(movie);
  });
});

app.put('/api/movies/:id', (request, response) => {
  Movie.query().patchAndFetchById(request.params.id, request.body).then((movie) => {
    response.send(movie);
  });
});

const server = http.createServer(app).listen(process.env.PORT || 3001);
console.log('Listening on port %d', server.address().port);
