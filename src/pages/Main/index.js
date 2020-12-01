import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Display from '../../components/molecules/display';
import { MovieContext } from '../../utils/MovieContext';
import './main.scss';
import { Navbar } from '../../components/molecules';
import Banner from '../../assets/banner.png';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poster: [],
      total: 0,
    };
  }

  UNSAFE_componentWillMount() {
    const currCash = JSON.parse(localStorage.getItem('Cash'));

    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=7f6b20003610bcd094d9bd0dd92d4080&language=en-US&region=ID&sort_by=popularity.desc&page=1&release_date.lte=2020-11-29&year=2020&vote_average.gte=3')
      .then((res) => this.setState({
        total: res.data.total_pages,
      }));

    localStorage.setItem('Loading', JSON.stringify(true));

    if (!currCash) {
      localStorage.setItem('Cash', JSON.stringify(100000));
    }
  }

  componentDidMount() {
    // const { page } = this.state;
    const { match: { params: { page } } } = this.props;
    const pages = page || 1;

    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=7f6b20003610bcd094d9bd0dd92d4080&language=en-US&region=ID&sort_by=popularity.desc&page=${pages}&release_date.lte=2020-11-29&year=2020&vote_average.gte=3`)
      .then((res) => this.setState({
        poster: res.data.results,
      }));

    localStorage.setItem('Loading', JSON.stringify(false));
    localStorage.setItem('Page', pages);
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

  changePage = (page) => {
    localStorage.setItem('Page', JSON.stringify(page));
  }

  displayPage = () => {
    const page = JSON.parse(localStorage.getItem('Page'));
    // const active = 1;
    const items = [];
    const { total } = this.state;

    for (let i = 1; i <= total; i += 1) {
      items.push(
        <Pagination.Item key={i} active={i === page} href={`/page/${i}`} onClick={() => this.changePage(i)}>
          {i}
        </Pagination.Item>,
      );
    }

    const newBtn = (
      <Pagination>{items}</Pagination>
    );

    return newBtn;
  }

  render() {
    const { poster } = this.state;
    const Loading = JSON.parse(localStorage.getItem('Loading'));

    if (Loading) {
      return <div className="loading"> </div>;
    }

    return (
      <div className="main-page">
        <Navbar />
        <img className="banner" src={Banner} alt="Banner" />
        <h1>Discover</h1>
        <div className="main-movies">
          <MovieContext.Consumer>
            {(context) => (
              poster.map((item) => (
                <Display
                  key={item.id}
                  src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
                  movie={item}
                  slug={item.title.toLowerCase().split(' ').join('-')}
                  price={this.setPrice(item.vote_average)}
                  click={() => context.setMovie(item.id)}
                />
              )))}
          </MovieContext.Consumer>
        </div>
        <div className="pagination-container">
          {this.displayPage()}
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Main;
