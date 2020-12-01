import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/logo.png';
import Coins from '../../../assets/coins.png';
import User from '../../../assets/user.png';
import './navbar.scss';

export default function Navbar() {
  const cash = JSON.parse(localStorage.getItem('Cash')).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return (
    <div className="navbar-container">
      <div className="navbar-item">
        <Link to="/"><img src={Logo} alt="Streamflix" /></Link>

        <div className="navbar-right">
          <div className="link-page">
            <Link to="/">Discover</Link>
            <Link to="/collection">Collection</Link>
          </div>
          <div className="coins">
            <img src={Coins} alt="Coins" />
            <span>{`Rp ${cash}`}</span>
          </div>
          <img className="user-icon" src={User} alt="user" />
        </div>
      </div>
    </div>
  );
}
