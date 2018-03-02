import React from 'react';
import { shallow } from 'enzyme';

import MovieTableContainer from './MovieTableContainer';

const movies = [
  {
    id: 135397,
    overview: 'case word substring',
    release_date: '2015-10-02',
    poster_path: '/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg',
    title: 'The Title',
    vote_average: 6.9,
  },
  {
    id: 286217,
    overview: 'Case',
    release_date: '2014-06-12',
    poster_path: '/AjbENYG3b8lhYSkdrWwlhVLRPKR.jpg',
    title: 'Word',
    vote_average: 7.7,
  },
];

describe('MovieTableContainer', () => {
  let comp;
  beforeEach(() => {
    comp = shallow(<MovieTableContainer
      movies={movies}
      searchTerm=""
      sortType="title"
      setRatingFor={jest.fn}
    />);
  });

  describe('Filters movie by case keyword', () => {
    test('Empty string does not filter movies', () => {
      expect(comp.find('MovieTable').prop('movies')).toHaveLength(2);
    });

    test('Any substring satisfies the filter', () => {
      comp.setProps({ searchTerm: 'sub' });
      expect(comp.find('MovieTable').prop('movies')).toHaveLength(1);
    });

    test('Keyword is case insensitive', () => {
      comp.setProps({ searchTerm: 'Case' });
      expect(comp.find('MovieTable').prop('movies')).toHaveLength(2);
    });

    test('Title and overview are tested', () => {
      comp.setProps({ searchTerm: 'word' });
      expect(comp.find('MovieTable').prop('movies')).toHaveLength(2);
    });
  });

  describe('Sorts movies by property', () => {
    test('Sorts by title', () => {
      comp.setProps({ sortType: 'title' });
      expect(comp.find('MovieTable').prop('movies')).toEqual(movies);
    });

    test('Sorts by year of release_date', () => {
      comp.setProps({ sortType: 'release_date' });
      expect(comp.find('MovieTable').prop('movies')).toEqual([movies[1], movies[0]]);
    });
  });
});
