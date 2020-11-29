import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Poster, Title } from '../../atoms';
import './displayMovies.scss';

export default function Display({
  src, title, price, click,
}) {
  return (
    <div className="display-movies">
      <div className="movie-card">
        <>
          <Poster className="poster" src={src} />
          <Title className="title" title={title} />
          <p>
            Rp
            {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </p>
          <Link to="/details">
            <button type="button" className="button" onClick={click}>Details</button>
          </Link>
        </>
      </div>
    </div>
  );
}

Display.propTypes = {
  src: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  price: PropTypes.node.isRequired,
  click: PropTypes.node.isRequired,
};
