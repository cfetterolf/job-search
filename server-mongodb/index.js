/* eslint-disable no-console */
/* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const url = require('url');
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

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

app.get('/api/test', (req, res) => {
  res.send({ ok: 'good'});
})


/*
 * Sends an email from USER_EMAIL account to DEST_EMAIL
 *
 * Expected request body:
 *    to:       DEST_EMAIL
 *    from:     USER_EMAIL
 *    name:     USER_NAME
 *    password: USER_PASSWORD
 *    subject:  subject line of email
 *    content:  body of email
 */
app.post('/api/email', (request, response) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: request.body.from,
      pass: request.body.password,
    },
  });

  const mailOptions = {
    from: `"${request.body.name}" <${request.body.from}>`,
    to: request.body.to,
    subject: request.body.subject,
    text: request.body.content,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      response.send({ error: err });
    } else {
      response.send({ info: info });
    }
  });
});

// We create the server explicitly (instead of using app.listen()) to
// provide an example of how we would create a https server
const server = http.createServer(app).listen(process.env.PORT || 3001);
console.log('Listening on port %d', server.address().port);
