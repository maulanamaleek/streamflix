import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const MovieContext = React.createContext();

class MovieProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieID: 0,
      movie: {},
      moviecast: {},
    };
  }

  setMovie = async (id) => {
    const resMovie = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=7f6b20003610bcd094d9bd0dd92d4080&language=en-US`);
    const resCast = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=7f6b20003610bcd094d9bd0dd92d4080&language=en-US`);
    this.setState({
      movie: resMovie.data,
      movieID: id,
      moviecast: resCast.data,
    });
  };

  render() {
    const { children } = this.props;
    const { movieID, movie, moviecast } = this.state;
    return (
      <MovieContext.Provider
        value={{
          movieID,
          movie,
          moviecast,
          setMovie: this.setMovie,
        }}
      >
        {children}
      </MovieContext.Provider>
    );
  }
}

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MovieProvider;
