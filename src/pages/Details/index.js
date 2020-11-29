import React from 'react';
// import axios from 'axios';
import { MovieContext } from '../../utils/MovieContext';

function Details() {
  return (
    <div>
      <h1>Details</h1>
      <MovieContext.Consumer>
        {(context) => (
          <div className="details-movie">
            <img src={`https://image.tmdb.org/t/p/w200/${context.movie.poster_path}`} alt={context.movie.title} />
            <h3>{context.movie.title}</h3>
            <p>
              {context.movie.runtime}
              minutes
            </p>
            <p>
              casts:
            </p>
            <p>{context.movie.overview}</p>
          </div>
        )}
      </MovieContext.Consumer>
    </div>
  );
}

export default Details;
