import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts';
import { login } from '../api/apiService';
import useToken from '../custom_hooks/useToken';

const loginUser = async (creds) => {
    const res = await login(creds);
    //console.log(res.data);
    localStorage.setItem('user_id', res.data.id);
    const token = res.data.token;
    console.log(token);
    return token;
}

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    //const tokenHook = useToken();
    //const [token, setToken] = useState();
    const { token, setToken, clearToken } = useToken();

    const handleLogin = async (e, email, password ) => {
        e.preventDefault();
        const tok = await loginUser({
            email,
            password
        });
        console.log(tok);
        //tokenHook.setToken(tok); // save token to browser storage
        setToken(tok);

        const origin = location.state?.from?.pathname || '/dashboard';
        navigate(origin);
    }

    const handleLogout = () => {
        localStorage.removeItem('user_id');
        clearToken();
        setToken(null);
    }

    const value = { 
        token,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    /*useEffect(() => {
        console.log(token);
    }, [token]);*/

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
