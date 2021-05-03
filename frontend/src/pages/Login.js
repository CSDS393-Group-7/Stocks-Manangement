import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, saveToken } from '../store/user/user';
import "../css/Login.css";

const Login = () => {

    const URL = "http://localhost:8000/api/user/login";

    const history = useHistory();
    
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const dispatch = useDispatch();
    
    const registerClick = () => {
        history.push("/signup");
    }
    
    const loginClick = async (e) => {
        e.preventDefault();
        let result = await fetch((URL), {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
            })
        });

        if(result.status === 200) {
            alert("Log in successfully!");
            dispatch(saveToken(result.json()));
            dispatch(setUser(result.info));
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

            <div className="login__container">
                <h1>Login</h1>
                <form>
                    <TextField placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} fullWidth />

                    <TextField placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth margin="normal" />

                    <button className="login__signInButton" type="submit" onClick={loginClick}>Login</button>
                </form>

                <p> New user? Register now</p>

                <button onClick={registerClick} className="login__registerButton">Create account</button>
            </div>
        </div>
    );
};

export default Login;