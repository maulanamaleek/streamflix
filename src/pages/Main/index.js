import React, { Component } from 'react';
import axios from 'axios';
import Display from '../../components/molecules/display';
import { MovieContext } from '../../utils/MovieContext';
// import selectedMovie from '../../utils/MovieContextProvider';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poster: [],
    };
  }

  componentDidMount() {
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=7f6b20003610bcd094d9bd0dd92d4080&language=en-US&region=ID&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.lte=2020-11-27&year=2020')
      .then((res) => this.setState({
        poster: res.data.results,
      }));
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

  render() {
    const { poster } = this.state;
    return (
      <MovieContext.Consumer>
        {(context) => (
          poster.map((item) => (
            <Display
              key={item.id}
              src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
              title={item.title}
              price={this.setPrice(item.vote_average)}
              click={() => context.setMovie(item.id)}
            />
          )))}
      </MovieContext.Consumer>
    );
  }
}

export default Main;
