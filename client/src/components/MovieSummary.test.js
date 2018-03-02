import React from 'react';
import { shallow } from 'enzyme';

import MovieSummary from './MovieSummary';

const movie = {
  id: 135397,
  overview: 'Twenty-two years after the events of Jurassic Park...',
  release_date: '2015-06-12',
  poster_path: '/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg',
  title: 'Jurassic World',
  vote_average: 6.9,
};

describe('MovieSummary', () => {
  test('MovieSummary snapshot', () => {
    const comp = shallow(<MovieSummary {...movie} onClick={jest.fn} setRatingFor={jest.fn} />);
    expect(comp).toMatchSnapshot();
  });
});
