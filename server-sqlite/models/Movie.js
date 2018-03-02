const path = require('path');
const { Model } = require('objection');

class Movie extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'Movie';
  }

  // Use virtual attributes to mimic the data returned by the mongoDB server
  // http://vincit.github.io/objection.js/#virtualattributes
  static get virtualAttributes() {
    return ['genre_ids'];
  }

  genre_ids() { // eslint-disable-line camelcase
    return this.genres.map(genre => genre.id);
  }

  static get relationMappings() {
    return {
      genres: {
        relation: Model.HasManyRelation,
        // The related model. This can be either a Model subclass constructor or an
        // absolute file path to a module that exports one. We use the file path version
        // here to prevent require loops.
        modelClass: path.join(__dirname, 'Genre'),
        join: {
          from: 'Movie.id',
          to: 'Genre.movieId',
        },
      },
    };
  }
}

module.exports = Movie;
