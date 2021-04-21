import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Login.css";

const Login = () => {

    const history = useHistory();
    
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    
    const registerClick = () => {
        history.push("/signup");
    }
    
    const loginClick = async (e) => {
        e.preventDefault();

        let result = await fetch(("http://localhost:8000/api/user/login"), {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
            })
        });

        console.log(result);

        // history.push("/");
    }

    return (
        <div className="login">
            <Link to="/">
                <img className="login__logo" src="" alt="logo"/>
            </Link>

            <div className="login__container">
                <h1>Login</h1>
                <form>
                    <input placeholder="Username" type="text" value={username} onChange={e => setUsername(e.target.value)}></input>

                    <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}></input>

                    <button className="login__signInButton" type="submit" onClick={loginClick}>Login</button>
                </form>

                <p> New user? Register now</p>

                <button onClick={registerClick} className="login__registerButton">Create account</button>
            </div>
        </div>
    );
};

export default Login;