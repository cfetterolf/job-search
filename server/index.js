/* eslint-disable no-console */
/* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const url = require('url');
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helper = require('./helper');

// Create Express application
const app = express();

// Resolve client build directory as absolute path to avoid errors in express
const path = require('path'); // eslint-disable-line global-require
const buildPath = path.resolve(__dirname, '../client/build');

// Express only serves static assets in production
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

// Set up endpoints
app.post('/api/guess', helper.getEmailAddress);
app.post('/api/email', helper.sendEmail);

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
