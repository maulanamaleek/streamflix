import React, { Component } from 'react';
// import axios from 'axios';
import { MovieContext } from '../../utils/MovieContext';
import './details.scss';

class Details extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     btn: 'Purchase',
  //   };
  // }

  switchButton = (id) => {
    const localOwned = JSON.parse(localStorage.getItem('Owned'));
    let btnText = '';
    // const { btn } = this.state;

    if (!localOwned) {
      btnText = 'Purchase';
    }

    if (localOwned) {
      const filteredOwned = localOwned.filter((item) => item.id === id);

      if (filteredOwned.length) {
        btnText = 'Watch Now';
      }

      if (!filteredOwned.length) {
        btnText = 'Purchase';
      }
    }
    // window.location.reload();
    // this.setState({ btn: btnText });
    return btnText;
  };

  render() {
    const Movie = JSON.parse(localStorage.getItem('Movie'));
    const Price = JSON.parse(localStorage.getItem('Price'));
    return (
      <div className="details">
        <h1>Details</h1>
        <MovieContext.Consumer>
          {(context) => (
            <div className="details-movie">
              <div className="details-left">
                <img src={`https://image.tmdb.org/t/p/w200/${Movie.poster_path}`} alt={Movie.title} />
              </div>
              <div className="details-right">
                <h3>{Movie.title}</h3>
                <p>{Movie.vote_average}</p>
                <p>
                  {`${Movie.runtime} minutes`}
                </p>
                <p>{Movie.overview}</p>
                <button type="button" onClick={() => context.purchase(Movie)}>{this.switchButton(Movie.id)}</button>
                <span>{`Rp ${Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`}</span>
              </div>
            </div>
          )}
        </MovieContext.Consumer>
      </div>
    );
  }
}

export default Details;
