/* eslint-disable no-console */
/* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const url = require('url');
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const needle = require('needle');
const async = require('async');

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


/*
 * Endpoint to guess an email address.
 *
 *    f_name    the contact's first name
 *    l_name    the contact's last name
 *    company   the contact's company
 *    custom    custom email ending (ex gmail.com)
 */
app.post('/api/guess', (request, response) => {

  const f_name = request.body.f_name;
  const l_name = request.body.l_name;
  const company = request.body.company;
  const custom = request.body.custom;

  let emails = []
  let email = company ? company+'.com' : custom;

  // make gmail all caps to avoid verification issue
  email = (email === 'gmail.com') ? email.toUpperCase() : email;

  // contruct different forms of potential email
  emails.push(f_name+'.'+l_name+'@'+email);
  emails.push(f_name+'_'+l_name+'@'+email);
  emails.push(f_name+l_name+'@'+email);
  emails.push(l_name+'@'+email);
  emails.push(f_name.substring(0,1)+l_name+'@'+email);
  emails.push(f_name.substring(0,1)+'_'+l_name+'@'+email);
  emails.push(f_name+l_name.substring(0,1)+'@'+email);
  emails.push(f_name+'@'+email);

  let validArr = [], tryAgainArr = [], verFailArr = [];

  async.forEach(emails, function(addr, callback) {
    needle('post', 'http://mailtester.com/testmail.php', { email: addr })
    .then(function(response) {

      // the messages to search for
      const html = response.body;
      const noVer = `Server doesn't allow e-mail address verification`;
      const tooSoon = `4.2.1 The user you are trying to contact is receiving mail at a rate that`
      const success = `E-mail address is valid`;

      // Check for 403
      if (html.includes('403 Forbidden')) {
        response.send({
          err: '403 Forbidden'
        });
      }

      if (html.includes(success)) {
        validArr.push(addr.toLowerCase());
      } else if (html.includes(noVer)) {
        verFailArr.push(addr.toLowerCase());
      } else if (html.includes(tooSoon)) {
        tryAgainArr.push(addr.toLowerCase());
      }

      callback();
    });
  }, function(err) {
      if (err) {
        response.send({ error: err });
      }
      else {
        response.send({
          valid: validArr,
          verFail: verFailArr,
          tryAgain: tryAgainArr
        })
      }
  });
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
