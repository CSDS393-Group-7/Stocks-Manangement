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
            <Link to="/">
                <img className="header__logo" 
                    src="https://i.ibb.co/hLSCSgy/growth-logo.png" alt="growth-logo" border="0"></img>
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