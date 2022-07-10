import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useAuth } from '../../custom_hooks/useAuth';
import './Login.css';

export default function Login() {
    const { onLogin } = useAuth();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return(
        <div className='login-wrapper'>
            <h1>Please Log In</h1>
            <form onSubmit={(e) => {onLogin(e, {
                    email: email,
                    password: password
                });
            }}>
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
            <p>Don't have an account? <span>Register <NavLink to="/register" className="register">here</NavLink></span></p>
        </div>
    )
}