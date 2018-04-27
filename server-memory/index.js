/* eslint-disable no-console */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // Resolve client build directory as absolute path to avoid errors in express
  const buildPath = path.resolve(__dirname, '../client/build');

  app.use(express.static(buildPath));

  app.get('/', (request, response) => {
    response.sendFile(path.join(buildPath, 'index.html'));
  });
}

// Allow cross-origin request
const corsOptions = {
  methods: ['GET', 'PUT', 'POST'],
  origin: '*',
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const movies = {};

app.get('/api/movies', (request, response) => {
  response.send(Object.values(movies));
});

app.get('/api/movies/:id', (request, response) => {
  response.send(movies[request.params.id]);
});

app.put('/api/movies/:id', (request, response) => {
  movies[request.params.id] = request.body;
  response.send(request.body);
});

// Don't start server until data loaded
// We create the server explicitly (instead of using app.listen()) to
// provide an example of how we would create a https server
const server = http.createServer(app).listen(process.env.PORT || 3001);
console.log('Listening on port %d', server.address().port);
