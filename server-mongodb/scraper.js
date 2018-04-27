var request = require('request');
var cheerio = require('cheerio');
const http = require('http');
const express = require('express');
const cors = require('cors');

exports.scrape = () => {
  var clientServerOptions = {
      uri: 'http://'+clientHost+''+clientContext,
      body: JSON.stringify(postData),
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }
  }
  request(clientServerOptions, function (error, response) {
      console.log(error,response.body);
      return;
  });
  request('https://news.ycombinator.com', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      console.log(html);
      return html;
    } else {
      return 'failed';
    }
  });
};
