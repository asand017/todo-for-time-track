import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts';
import { login } from '../api/apiService';

const loginUser = async (creds) => {
    const res = await login(creds);
    const token = res.data.token;
    console.log(token);
    return token;
}

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [token, setToken] = useState(null);

    const handleLogin = async (e, email, password) => {
        e.preventDefault();
        const tok = await loginUser({
            email,
            password
        });
        console.log(tok)
        setToken(tok);

        const origin = location.state?.from?.pathname || '/dashboard';
        navigate(origin);
    }

    const handleLogout = () => {
        setToken(null);
    }

    const value = { 
        token,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
