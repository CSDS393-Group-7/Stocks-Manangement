import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Signup.css";

const Signup = () => {

    const history = useHistory();
    const[username, setUsername] = useState('');
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
                    <input placeholder="Username" type="text" value={username} onChange={e => setUsername(e.target.value)}></input>

                    <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}></input>

                    <input placeholder="Retype your password" type="password" value={retype} onChange={e => setRetype(e.target.value)}></input>

                </form>

                <button className="signup__registerButton" onClick={createUser}>Sign up</button>
            </div>
        </div>
    );
};

export default Signup;