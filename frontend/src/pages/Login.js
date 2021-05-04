import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, saveToken } from '../store/user/user';
import "../css/Login.css";

import { BeatLoader, PulseLoader } from 'react-spinners';

import ErrorAlert from '../components/Alert/ErrorAlert';
import SuccessAlert from '../components/Alert/SuccessAlert';

const Login = () => {

    const URL = "http://localhost:8000/api/user/login";

    const history = useHistory();
    
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState({
        open: false,
        message: ''
    });
    const[success, setSuccess] = useState({
        open: false,
        message: ''
    });

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
                    setSuccess({
                        open: true,
                        message: (<span>Log in successfully! <br /> Your page is redirected in a few second <BeatLoader size={6} margin={2} /></span>)
                    });
                    signInSuccessfully = true;
                }
                else if (result.status === 404) {
                    setError({
                        open: true,
                        message: 'Username does not exist!'
                    });
                }
                else if (result.status === 403) {
                    setError({
                        open: true,
                        message: 'Your password is incorrect!'
                    });
                }
                else {
                    setError({
                        open: true,
                        message: 'Something weird happened!'
                    });
                }
                return result.json();
            }
    ).then(data => {
        if (signInSuccessfully === true) {
            dispatch(saveToken(data.token));
            dispatch(setUser({
                username: data.info.username,
                fullname: data.info.fullName,
                email: data.info.email
            }));
            setTimeout(() => history.goBack(), 2000);
        }
    })};

    return (
        <div className="login">
            <ErrorAlert open={error.open} message={error.message} onClose={() => setError(err => ({...err, open: false}))} />
            <SuccessAlert open={success.open} message={success.message} onClose={() => setSuccess(suc => ({...suc, open: false}))} />
            <div className="login__container">
                <h1>Login</h1>
                <form>
                    <TextField placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} fullWidth />

                    <TextField placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth margin="normal" />

                    <button className="login__signInButton" type="submit" onClick={loginClick}>Login</button>
                </form>

                <p>New user? Register now</p>

                <button onClick={registerClick} className="login__registerButton">Create account</button>
            </div>
        </div>
    );
};

export default Login;