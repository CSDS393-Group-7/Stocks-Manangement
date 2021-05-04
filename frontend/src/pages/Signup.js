import { TextField, makeStyles, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { BeatLoader } from 'react-spinners';

import ErrorAlert from '../components/Alert/ErrorAlert';
import SuccessAlert from '../components/Alert/SuccessAlert';

import "../css/Signup.css";

const useStyles = makeStyles(theme => ({
    textField: {
        marginBottom: '10px',
    },
    signupButton: {
        marginTop: '20px',
        marginBottom: '20px'
    }
}));

const Signup = () => {

    const URL = "http://localhost:8000/api/user/create" ;
    const classes = useStyles();

    const history = useHistory();
    const[username, setUsername] = useState('');
    const[fullname, setFullname] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[retype, setRetype] = useState('');
    const[error, setError] = useState({
        open: false,
        message: ''
    });
    const[success, setSuccess] = useState({
        open: false,
        message: ''
    });
  
    async function createUser(e) {
        e.preventDefault();
        if (username === '' || password === '' || retype === '' || email === '' || fullname === '') {
            setError({
                open: true,
                message: 'You must fill in all the fields'
            });
        }
        if (password !== retype) {
            setError({
                open: true,
                message: 'The two passwords do not match'
            });
        }
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) === false) {
            setError({
                open: true,
                message: 'Invalid email address'
            });
        }
        let result = await fetch((URL), {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                username: username,
                fullName: fullname,
                email: email,
                password: password,
            })
        });
       
        if (result.status === 200) {
            setSuccess({
                open: true,
                message: (<span>Sign up successfully!<br />Your page is redirected in a few second <BeatLoader size={6} margin={2} /></span>)
            });
            setTimeout(() => history.push("/login"), 2000);
        }
        else {
            setError({
                open: true,
                message: 'Username already exists!'
            });
        }
    }
    
    return (
        <div className="signup">
            <ErrorAlert open={error.open} message={error.message} onClose={() => setError(err => ({...err, open: false}))} />
            <SuccessAlert open={success.open} message={success.message} onClose={() => setSuccess(suc => ({...suc, open: false}))} />
            <div className="signup__container">
                <h1>Sign up</h1>
                <form>
                    <TextField className={classes.textField} placeholder="Username" type="text" value={username} onChange={e => setUsername(e.target.value)} fullWidth />
                    <TextField className={classes.textField} placeholder="Full name" type="text" value={fullname} onChange={e => setFullname(e.target.value)} fullWidth />
                    <TextField className={classes.textField} placeholder="Email" type="text" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
                    <TextField className={classes.textField} placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth />
                    <TextField className={classes.textField} placeholder="Retype your password" type="password" value={retype} onChange={e => setRetype(e.target.value)} fullWidth />
                </form>

                <Button className={classes.signupButton} onClick={createUser} variant="outlined">Sign up</Button>

                <Link to="/login"> Already have an account? Login now</Link>

            </div>
        </div>
    );
};

export default Signup;