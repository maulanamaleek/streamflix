import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Poster, Title } from '../../atoms';
import Star from '../../../assets/star.png';
import './displayMovies.scss';

export default function Display({
  src, movie, price, click, slug,
}) {
  return (
    <div className="display-movies">
      <div className="movie-card">
        <>
          <Poster className="poster" src={src} />
          <Title className="title" title={movie.title} />
          <div className="rating">
            <img src={Star} alt="rating" />
            <span>{movie.vote_average}</span>
          </div>
          <p>
            Rp
            {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </p>
          <Link to={`/${movie.id}/${slug}`}>
            <button type="button" className="button" onClick={click}>Details</button>
          </Link>
        </>
      </div>
    </div>
  );
}

Display.propTypes = {
  src: PropTypes.node.isRequired,
  movie: PropTypes.instanceOf(Object).isRequired,
  price: PropTypes.node.isRequired,
  click: PropTypes.func.isRequired,
  slug: PropTypes.node.isRequired,
};
