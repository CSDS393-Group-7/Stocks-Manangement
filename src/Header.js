import React from 'react';
import "./Header.css";
import { Link } from 'react-router-dom';

const Header = () => {
    const user = null;

    const handleAuthentication = () => {
        if (user) {
        }
    }

    return (
        <div className="header">
            <Link>
                <img className="header__logo" 
                    src="https://ultimateinvesting.sg/wp-content/uploads/2019/06/kissclipart-share-market-logo-clipart-stock-market-investment-0f68221e22f5b45c-1-300x173.png" alt="icon"></img>
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
                        <span className="header__optionLineOne">{user ? "Welcome, " + user?.email.substring(0, user?.email.indexOf('@')) : "Welcome, guest"}</span>
                        <span className="header__optionLineTwo">{user ? "Sign out" : "Sign in"}</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Header;