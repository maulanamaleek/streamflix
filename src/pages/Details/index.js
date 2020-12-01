import React, { Component } from 'react';
import { Footer, Navbar } from '../../components/molecules';
import Star from '../../assets/star.png';
import Time from '../../assets/time.png';
import { MovieContext } from '../../utils/MovieContext';
import './details.scss';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1000);
  }

  switchButton = (id) => {
    const localOwned = JSON.parse(localStorage.getItem('Owned'));
    let btnText = '';

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

    return btnText;
  };

  displayCast = () => {
    const Cast = JSON.parse(localStorage.getItem('Cast'));
    const casts = Cast.splice(0, 4);
    const castName = [];

    if (!Cast.length) {
      return null;
    }

    for (let i = 0; i < 4; i += 1) {
      castName.push(casts[i].name);
    }

    return castName.join(', ');
  };

  render() {
    const Movie = JSON.parse(localStorage.getItem('Movie'));
    const Price = JSON.parse(localStorage.getItem('Price'));
    const { loading } = this.state;

    if (loading) {
      return <div className="loading"> </div>;
    }

    return (
      <div className="details-container">
        <div className="details">
          <Navbar />
          <h1>Details</h1>
          <MovieContext.Consumer>
            {(context) => (
              <div className="details-movie">
                <div className="details-left">
                  <img src={`https://image.tmdb.org/t/p/w200/${Movie.poster_path}`} alt={Movie.title} />
                </div>
                <div className="details-right">
                  <h3 className="details-title">{Movie.title}</h3>
                  <div className="vote">
                    <img src={Star} alt="vote" />
                    <span>{Movie.vote_average}</span>
                  </div>
                  <div className="time">
                    <img src={Time} alt="time" />
                    <span>{`${Movie.runtime} minutes`}</span>
                  </div>
                  <h3 className="details-overview">Overview</h3>
                  <p className="overview">{Movie.overview}</p>
                  <p className="movie-cast-name">
                    Casts:
                    {' '}
                    {this.displayCast()}
                  </p>
                  <button type="button" onClick={() => context.purchase(Movie)}>{this.switchButton(Movie.id)}</button>
                  <span className="movie-price">{`Rp ${Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`}</span>
                </div>
              </div>
            )}
          </MovieContext.Consumer>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Details;
