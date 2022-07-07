import React, { useEffect, useState } from 'react';
import { useAuth } from "../custom_hooks/useAuth";
import useToken from "../custom_hooks/useToken";
import Login from './Login/Login';

export const Home = () => {
    const { token, onLogin } = useAuth();
    const [ login, setLogin ] = useState(false);
    //const { token } = useToken();

    useEffect(() => {
        console.log(token);
    }, [token]);

    return (
        <>
            <h2>Home Page</h2>

            {!token && <button type="button" onClick={() => { setLogin(true); }}>
                Sign In
            </button>}

            {login && <Login handleLogin={onLogin}/>}
        </>
    )
}