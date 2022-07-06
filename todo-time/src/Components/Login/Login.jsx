import React, { useState } from 'react';
import { login } from '../../api/apiService';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import './Login.css';

async function loginUser(creds) {
    /*return fetch('http://localhost:3001/users/login', {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    }).then(data => data.json())*/
    const res = await login(creds);
    const token = res.data.token;
    console.log(token);
    return token;
}

export default function Login({ setToken }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    //let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password
        });
        console.log(token)
        setToken(token);
        //navigate("/", { replace: true });
    }

    return(
        <div className='login-wrapper'>
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email</p>
                    <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <div style={{padding: '20px'}}>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <a>Don't have an account? Register here</a>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}