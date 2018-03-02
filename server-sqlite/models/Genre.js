const path = require('path');
const { Model } = require('objection');

class Genre extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'Genre';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      movie: {
        relation: Model.BelongsToOneRelation,
        // The related model. This can be either a Model subclass constructor or an
        // absolute file path to a module that exports one. We use the file path version
        // here to prevent require loops.
        modelClass: path.join(__dirname, 'Movie'),
        join: {
          from: 'Genre.movieId',
          to: 'Movie.id',
        },
      },
    };
  }
}

module.exports = Genre;
