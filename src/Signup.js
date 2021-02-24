import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Login.css";

const Signup = () => {

    const history = useHistory();
  
    const registerClick = () => {
        history.push("/");
    }
    
    return (
        <div className="login">
            <Link to="/">
                <img className="login__logo" src="" alt="logo"/>
            </Link>

            <div className="login__container">
                <h1>Sign up</h1>
                <form>
                    <input placeholder="Email" type="text"></input>

                    <input placeholder="Password" type="password"></input>

                    <input placeholder="Retype your password" type="password"></input>

                </form>

                <button className="login__registerButton" onClick={registerClick}>Sign up</button>
            </div>
        </div>
    );
};

export default Signup;