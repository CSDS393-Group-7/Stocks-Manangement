import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Login.css";
import axios from 'axios';
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
        let signInSuccessfully = false;
        await fetch((URL), {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }).then(result => {
                if(result.status === 200) {
                    alert("Log in successfully!");
                    signInSuccessfully = true;
                }
                else if (result.status === 404) {
                    alert("Username does not exist!");
                }
                else if (result.status === 403) {
                    alert("Your password is incorrect!");
                }
                else {
                    alert("Error!");
                }
                return result.json();
            }
        ).then(data => {
            if (signInSuccessfully === true) {
                //console.log(data.token);
                //console.log(data.info);
                dispatch(saveToken(data.token));
                dispatch(setUser({
                    username: data.info.username,
                    fullname: data.info.fullName,
                    email: data.info.email
                }));
                history.push("/");
            }
        })};

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