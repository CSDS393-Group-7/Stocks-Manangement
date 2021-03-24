import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Signup.css";

const Signup = () => {

    const history = useHistory();
  
    const registerClick = () => {
        history.push("/");
    }
    
    return (
        <div className="signup">
            <Link to="/">
                <img className="signup__logo" src="" alt="logo"/>
            </Link>

            <div className="signup__container">
                <h1>Sign up</h1>
                <form>
                    <input placeholder="Email" type="text"></input>

                    <input placeholder="Password" type="password"></input>

                    <input placeholder="Retype your password" type="password"></input>

                </form>

                <button className="signup__registerButton" onClick={registerClick}>Sign up</button>
            </div>
        </div>
    );
};

export default Signup;