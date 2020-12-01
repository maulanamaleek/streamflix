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
      price: 0,
      cash: 100000,
      owned: [],
    };
  }

  setPrice = (rating) => {
    let price = 0;

    if (rating >= 1 && rating <= 3) {
      price = 3500;
    }
    if (rating > 3 && rating <= 6) {
      price = 8250;
    }
    if (rating > 6 && rating <= 8) {
      price = 16350;
    }
    if (rating > 8 && rating <= 10) {
      price = 21250;
    }

    return price;
  }

  purchase = (movie) => {
    const owned = JSON.parse(localStorage.getItem('Owned'));
    const Price = JSON.parse(localStorage.getItem('Price'));
    let isAvailable;

    if (owned) {
      isAvailable = owned.filter((item) => item.id === movie.id);
    }

    if (!owned) {
      isAvailable = [];
    }

    if (!isAvailable.length) {
      const localOwned = JSON.parse(localStorage.getItem('Owned')) || [];
      const localCash = JSON.parse(localStorage.getItem('Cash'));
      let newCash = 0;
      let newOwned = [];

      newOwned = [...localOwned, movie];
      newCash = localCash - Price;

      if (newCash <= 0) {
        window.alert('Not enough balance to purchase');
      }

      if (newCash >= 0) {
        localStorage.setItem('Cash', JSON.stringify(newCash));
        localStorage.setItem('Owned', JSON.stringify(newOwned));
      }
      window.location.reload();
    }
  }

  setMovie = async (id) => {
    const resMovie = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=7f6b20003610bcd094d9bd0dd92d4080&language=en-US`);
    const resCast = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=7f6b20003610bcd094d9bd0dd92d4080&language=en-US`);
    this.setState({
      movie: resMovie.data,
      movieID: id,
      moviecast: resCast.data,
      price: this.setPrice(resMovie.data.vote_average),
    });
    localStorage.setItem('Movie', JSON.stringify(resMovie.data));
    localStorage.setItem('Price', JSON.stringify(this.setPrice(resMovie.data.vote_average)));
    localStorage.setItem('Cast', JSON.stringify(resCast.data.cast));

    window.location.reload();
  };

  displayCast = (casts) => {
    const displayCasts = [];
    for (let i = 0; i < 4; i += 1) {
      displayCasts.push(casts[i].name);
    }
    return <span>{displayCasts.join(',')}</span>;
  }

  render() {
    const { children } = this.props;
    const {
      movieID, movie, moviecast, price, cash, owned,
    } = this.state;
    return (
      <MovieContext.Provider
        value={{
          movieID,
          movie,
          moviecast,
          setMovie: this.setMovie,
          price,
          cash,
          owned,
          purchase: this.purchase,
          cast: this.displayCast,
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
