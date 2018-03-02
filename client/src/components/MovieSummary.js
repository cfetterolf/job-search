import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import StarRating from './StarRating';

const Summary = styled.div`
margin: 20px;
`;

const Title = styled.p`
font-weight:bold;
margin:0px;
`;
Title.displayName = 'MovieTitle';

const Year = styled.p`
margin: 0px;
padding-left: 1em;
color: #999999;
`;

const TMDBScore = styled.p`
margin:0px;
padding-left: 1em;
font-size:smaller;
`;


function MovieSummary(props) {
  return (
    <Summary>
      <Title onClick={() => props.onClick(props.id)} >{props.title}</Title>
      <StarRating
        rating={props.rating}
        setRating={(rating) => { props.setRatingFor(props.id, rating); }}
      />
      <Year>({props.release_date.slice(0, 4)})</Year>
      <TMDBScore>TMDB score: {props.vote_average}</TMDBScore>
    </Summary>
  );
}

MovieSummary.propTypes = {
  title: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  rating: StarRating.propTypes.rating, // eslint-disable-line react/no-typos
  vote_average: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  setRatingFor: PropTypes.func.isRequired,
};

MovieSummary.defaultProps = {
  rating: StarRating.defaultProps.rating,
};

export default MovieSummary;
