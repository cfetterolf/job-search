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
    const oldMovie = this.state.movies.find(movie => filmid === movie.id);
    const newMovie = Object.assign({}, oldMovie, { rating });

    fetch(`/api/movies/${filmid}`, {
      method: 'PUT',
      body: JSON.stringify(newMovie),
      headers: new Headers({ 'Content-type': 'application/json' }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.status_text);
      }
      return response.json();
    }).then((updatedMovie) => {
      // It would tempting to save the index where we first found the film
      // but it is possible that state.movies has changed in the meantime
      const updatedMovies = this.state.movies.map((movie) => {
        if (movie.id === updatedMovie.id) {
          return updatedMovie;
        }
        return movie;
      });
      this.setState({ movies: updatedMovies });
    }).catch(err => console.log(err)); // eslint-disable-line no-console
  }

  render() {
    let movieContents = (<h2>Loading...</h2>);
    if (this.state.movies.length > 0) {
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
