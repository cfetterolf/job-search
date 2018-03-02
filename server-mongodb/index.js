/* eslint-disable no-console */
/* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const url = require('url');
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoDB = require('mongodb');

const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:5000/film-explorer';
const { MongoClient, ObjectID } = mongoDB;

// Create Express application
const app = express();

// Database connection
let db;

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

// Allow cross-origin request
const corsOptions = {
  methods: ['GET', 'PUT', 'POST'],
  origin: '*',
  allowedHeaders: ['Content-Type'],
};

// Set up express middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/api/movies', (request, response) => {
  db.collection('movies').find().toArray((err, documents) => {
    if (err) {
      console.error(err);
      response.sendStatus(500);
    } else {
      response.send(documents);
    }
  });
});

app.get('/api/movies/:id', (request, response) => {
  const movieId = parseInt(request.params.id, 10);

  db.collection('movies').find({ id: movieId }).next((err, document) => {
    if (err) {
      console.error(err);
      response.sendStatus(500);
    } else {
      response.send(document);
    }
  });
});

app.put('/api/movies/:id', (request, response) => {
  const movieId = parseInt(request.params.id, 10);

  const movie = request.body;
  movie._id = ObjectID.createFromHexString(movie._id);

  db.collection('movies').findOneAndUpdate({ id: movieId }, { $set: movie }, { returnOriginal: false }, (err, result) => {
    if (err || result.ok !== 1) {
      console.error(err);
      response.sendStatus(500);
    } else {
      response.send(result.value);
    }
  });
});

MongoClient.connect(mongoURL, (err, database) => {
  if (err) {
    console.error(err);
  } else {
    // Don't start server unless we have successfully connect to the database
    db = database.db(url.parse(mongoURL).pathname.slice(1)); // Extract database name

    // We create the server explicitly (instead of using app.listen()) to
    // provide an example of how we would create a https server
    const server = http.createServer(app).listen(process.env.PORT || 3001);
    console.log('Listening on port %d', server.address().port);
  }
});
