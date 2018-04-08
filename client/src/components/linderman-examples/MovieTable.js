import React from 'react';
import PropTypes from 'prop-types';

import MovieContainer from './MovieContainer';

function MovieTable(props) {
  const films = props.movies.map(movie => (
    <MovieContainer
      key={movie.id}
      {...movie}
      setRatingFor={props.setRatingFor}
    />
  ));
  return (
    <div>
      {films}
    </div>
  );
}

MovieTable.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  setRatingFor: PropTypes.func.isRequired,
};

export default MovieTable;
