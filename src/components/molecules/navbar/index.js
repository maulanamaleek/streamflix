import React from 'react';
import { MovieContext } from '../../../utils/MovieContext';
import Logo from '../../../assets/logo.png';
import './navbar.scss';

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-item">
        <img src={Logo} alt="Streamflix" />
        <MovieContext.Consumer>
          {(context) => <p>{`Rp ${context.cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`}</p>}
        </MovieContext.Consumer>
        <p>Hello, Malik!</p>
      </div>
    </div>
  );
}
