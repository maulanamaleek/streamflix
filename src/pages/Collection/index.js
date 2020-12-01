import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/molecules';
import Play from '../../assets/play.png';
import './collection.scss';

export default function Collection() {
  const movie = JSON.parse(localStorage.getItem('Owned'));

  const reset = () => {
    localStorage.removeItem('Owned');
    localStorage.setItem('Cash', JSON.stringify(100000));

    window.location.reload();
  };

  if (!movie) {
    return (
      <div className="no-collection">
        <Navbar />
        <h1>You Have No Movie Collection</h1>
        <Link to="/"><button type="button">Discover Now</button></Link>
      </div>
    );
  }

  return (
    <div className="collection">
      <Navbar />
      <h1>Your Movie Collection!</h1>
      <button className="reset" type="button" onClick={() => reset()}>
        reset all collections
      </button>
      <div className="movie-collection">
        {movie.map((item) => (
          <div key={item.id} className="item-collection">
            <img src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`} alt="poster" />
            <h3>{item.title}</h3>
            <span>{`${item.runtime} minutes`}</span>
            <button type="button">
              <img className="play" src={Play} alt="watch" />
              <span>Watch Now</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
