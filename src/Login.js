import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Login.css";

const Login = () => {

    const history = useHistory();
    
    const registerClick = () => {
        history.push("/signup");
    }
    
    const loginClick = () => {
        history.push("/");
    }

    return (
        <div className="login">
            <Link to="/">
                <img className="login__logo" src="" alt="logo"/>
            </Link>

            <div className="login__container">
                <h1>Login</h1>
                <form>
                    <input placeholder="Email" type="text"></input>

                    <input placeholder="Password" type="password"></input>

                    <button className="login__signInButton" type="submit" onClick={loginClick}>Login</button>
                </form>

                <p> New user? Register now</p>

                <button onClick={registerClick} className="login__registerButton">Create account</button>
            </div>
        </div>
    );
};

export default Login;