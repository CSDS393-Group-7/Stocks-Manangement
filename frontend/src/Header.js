import React from 'react';
import "./Header.css";
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';

const Header = () => {
    const user = useStateValue();

    const handleAuthentication = () => {
      if (user) {
      }
    }

  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" 
          src="https://thumbs.dreamstime.com/b/growth-chart-infographic-chart-icon-white-icon-dark-background-growth-chart-infographic-chart-icon-white-icon-dark-156695206.jpg" alt="icon"></img>
      </Link>

      <div className="header__nav">
        <Link className="text-link" to="/">
          <div className="header__option">
            <span>Home</span>
          </div>
        </Link>
        <Link className="text-link" to="/stockmanagement">
          <div className="header__option">
            <span>Stock Management</span>
          </div>
        </Link>
        <Link className="text-link" to={!user && "/login"} >
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">{user ? "Welcome, " + user?.username : "Welcome, guest"}</span>
            <span className="header__optionLineTwo">{user ? "Sign out" : "Sign in"}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;