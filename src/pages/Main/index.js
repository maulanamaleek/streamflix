import React, { Component } from 'react';
import axios from 'axios';
import Display from '../../components/molecules/display';

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

  set = () => {
    setTimeout(() => {
      const { poster } = this.state;
      console.log(poster);
    }, 5000);
  }

  render() {
    const { poster } = this.state;
    return (
      <div>
        <h1>Text</h1>
        {poster.map((item) => <Display key={item.id} src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} title={item.title} />)}
      </div>
    );
  }
}

export default Main;
