import React from 'react';
import PropTypes from 'prop-types';

import MovieTable from './MovieTable';

function MovieTableContainer(props) {
  let films = props.movies;
  if (props.searchTerm) {
    const term = props.searchTerm.toLowerCase();
    films = films.filter((movie) => {
      const title = movie.title.toLowerCase();
      const desc = movie.overview.toLowerCase();
      return title.includes(term) || desc.includes(term);
    });
  }

  if (props.sortType) {
    films = (props.searchTerm) ? films : films.slice(); // Make copy if not filtered
    const field = props.sortType;
    films.sort((m1, m2) => {
      if (m1[field] < m2[field]) {
        return -1;
      } else if (m1[field] === m2[field]) {
        return 0;
      }
      return 1;
    });
  }

  return (
    <MovieTable
      movies={films}
      setRatingFor={props.setRatingFor}
    />
  );
}

MovieTableContainer.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchTerm: PropTypes.string,
  sortType: PropTypes.string,
  setRatingFor: PropTypes.func.isRequired,
};

MovieTableContainer.defaultProps = {
  searchTerm: null,
  sortType: null,
};

export default MovieTableContainer;
