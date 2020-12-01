import React from 'react';
import { Link } from 'react-router-dom';
import { MovieContext } from '../../../utils/MovieContext';
import Logo from '../../../assets/logo.png';
import Coins from '../../../assets/coins.png';
import './navbar.scss';

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-item">
        <Link to="/"><img src={Logo} alt="Streamflix" /></Link>
        <Link to="/">Discover</Link>
        <Link to="/collection">Collection</Link>
        <MovieContext.Consumer>
          {(context) => (
            <div className="coins">
              <img src={Coins} alt="Coins" />
              <span>{`Rp ${context.cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`}</span>
            </div>
          )}
        </MovieContext.Consumer>
        <p>Hello, Malik!</p>
      </div>
    </div>
  );
}
