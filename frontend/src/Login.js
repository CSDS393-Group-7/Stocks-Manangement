import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Login.css";
import axios from 'axios';
const Login = () => {

    const history = useHistory();
    
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    
    const registerClick = () => {
        history.push("/signup");
    }
    
    const loginClick = async (e) => {
        e.preventDefault();
        // let result = await fetch(("http://localhost:8000/api/user/login"), {
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     method: "POST",
        //     body: JSON.stringify({
        //         username: username,
        //         password: password,
        //     })
        // });
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        }
        const body = JSON.stringify({
            username: username,
            password: password,
        })
        const result = await axios.post("http://localhost:8000/api/user/login", body, config);
        localStorage.setItem("jwt", result.data);

        if(result.status === 200) {
            alert("Log in successfully!");
            history.push("/");
        }
        else if (result.status === 404) {
            alert("Username does not exist!");
        }
        else if (result.status === 403) {
            alert("Your password is incorrect!");
        }
        else {
            alert("Error!")
        }
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