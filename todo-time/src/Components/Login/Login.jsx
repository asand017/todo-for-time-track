import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useAuth } from '../../custom_hooks/useAuth';
import { Button, Paper, TextField, Stack } from '@mui/material';
import './Login.css';

export default function Login() {
    const { onLogin } = useAuth();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return(
        <div className='login-wrapper'>
            <Paper elevation={3} sx={{padding: '2em', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h2 style={{textDecoration: 'underline'}}>Please Log In</h2>
                <form style={{display: 'flex', flexDirection: 'column', margin: '0.75em 0'}} onSubmit={(e) => {onLogin(e, {
                        email: email,
                        password: password
                    });
                }}>
                    <Stack spacing={2}>
                        <TextField id="email" label="Email" type="text" onChange={(e) => setEmail(e.target.value)}/>
                        <TextField id="password" label="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                        <Button className="action-button" variant='contained' type="submit">Submit</Button>
                    </Stack>
                </form>
                <p>Don't have an account? <span>Register <NavLink to="/register" className="register">here</NavLink></span></p>
            </Paper>
        </div>
    )
}