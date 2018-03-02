/* eslint-disable func-names, camelcase */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require('fs');
const { Model, transaction } = require('objection');
const Movie = require('../models/Movie');

const contents = fs.readFileSync('movies.json');
const data = JSON.parse(contents);

exports.seed = function (knex, Promise) {
  // Bind all Models to a knex instance
  Model.knex(knex);

  // Deletes ALL existing entries
  return Promise.all([knex('Movie').del(), knex('Genre').del()])
    .then(() => {
      // Inserts seed entries (filtering for only desired properties)
      const graph = data.map((movie) => {
        const {
          id, overview, release_date, poster_path, title, vote_average, genre_ids,
        } = movie;
        // The genres properties creates the corresponding entries for the
        // HasMany relation
        return ({
          id,
          overview,
          release_date,
          poster_path,
          title,
          vote_average,
          genres: genre_ids.map(genre_id => ({ id: genre_id })),
        });
      });
      // Insert the graph as a single transaction
      return transaction(Movie.knex(), trx => Movie.query(trx).insertGraph(graph));
    });
};
