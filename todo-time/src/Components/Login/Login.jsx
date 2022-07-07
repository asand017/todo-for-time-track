import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

export default function Login({ handleLogin }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return(
        <div className='login-wrapper'>
            <h1>Please Log In</h1>
            <form onSubmit={(e) => {handleLogin(e,email,password);}}>
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
    handleLogin: PropTypes.func.isRequired
}