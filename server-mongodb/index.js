/* eslint-disable no-console */
/* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const url = require('url');
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoDB = require('mongodb');

const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:5000/job-search';
const { MongoClient, ObjectID } = mongoDB;

// Create Express application
const app = express();

// Resolve client build directory as absolute path to avoid errors in express
const path = require('path'); // eslint-disable-line global-require
const buildPath = path.resolve(__dirname, '../client/build');

// express only serves static assets in production
if (process.env.NODE_ENV === 'production') {

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

app.get('/api', (request, response) => {
  response.send({ response: "Hello!" });
});

/* default route */
// app.get('/', (request, response) => {
//   response.sendFile(path.join(buildPath, 'index.html'));
// });

// We create the server explicitly (instead of using app.listen()) to
// provide an example of how we would create a https server
const server = http.createServer(app).listen(process.env.PORT || 3002);
console.log('Listening on port %d', server.address().port);
