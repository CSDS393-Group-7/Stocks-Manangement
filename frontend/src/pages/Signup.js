import { TextField, makeStyles, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import "../css/Signup.css";

const useStyles = makeStyles(theme => ({
    textField: {
        marginBottom: '10px',
    },
    signupButton: {
        marginTop: '20px',
    }
}));

const Signup = () => {
    const classes = useStyles();

    const history = useHistory();
    const[username, setUsername] = useState('');
    const[fullname, setFullname] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[retype, setRetype] = useState('');
  
    async function createUser(e) {
        e.preventDefault();
        if (password != retype) {
            alert("The two passwords do not match");
        }
        let result = await fetch(("http://localhost:8000/api/user/create"), {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                username: username,
                fullname: fullname,
                email: email,
                password: password,
            })
        });
        console.log(result);
        console.log(result.status);

        if (result.status === 200) {
            alert("Sign up successfully!");
            history.push("/login");
        }
        else {
            alert("Username already exists!");
        }
    }
    
    return (
        <div className="signup">
            <Link to="/">
                <img className="signup__logo" src="" alt="logo"/>
            </Link>

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
            </div>
        </div>
    );
};

export default Signup;