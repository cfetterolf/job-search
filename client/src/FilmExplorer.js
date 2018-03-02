import React, { Component } from 'react';

// import movieData from '../public/movies.json';
import MovieTableContainer from './components/MovieTableContainer';
import SearchBar from './components/SearchBar';


class FilmExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      sortType: 'title',
      movies: [],
    };

    // this.state.movies = movieData.movies;
  }

  componentDidMount() {
    fetch('/api/movies/')
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status_text);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ movies: data });
      })
      .catch(err => console.log(err)); // eslint-disable-line no-console
  }

  setRating(filmid, rating) {
    let film = this.state.movies.find(movie => filmid === movie.id);
    film = Object.assign({}, film, { rating });

    const filmStr = JSON.stringify(film);
    const request = new Request(
      `/api/movies/${filmid}`,
      {
        method: 'PUT',
        body: filmStr,
        headers: new Headers({ 'Content-type': 'application/json' }),
      },
    );

    fetch(request)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status_text);
        }
        return response.json();
      })
      .then((newFilm) => {
        // It would tempting to save the index where we first found the film
        // but it is possible that state.movies has changed in the meantime
        const alteredFilms = this.state.movies.map((movie) => {
          if (movie.id === newFilm.id) {
            return newFilm;
          }
          return movie;
        });
        this.setState({ movies: alteredFilms });
      }).catch(err => console.log(err)); // eslint-disable-line no-console
  }

  render() {
    let movieContents = (<h2>Loading...</h2>);
    if (this.state.movies) {
      movieContents = (<MovieTableContainer
        searchTerm={this.state.searchTerm}
        movies={this.state.movies}
        sortType={this.state.sortType}
        setRatingFor={(id, rating) => this.setRating(id, rating)}
      />);
    }

    return (
      <div className="FilmExplorer">
        <SearchBar
          searchTerm={this.state.searchTerm}
          setTerm={(term) => { this.setState({ searchTerm: term }); }}
          sortType={this.state.sortType}
          setType={(type) => { this.setState({ sortType: type }); }}
        />
        {movieContents}
      </div>
    );
  }
}

export default FilmExplorer;
