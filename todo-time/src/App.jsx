import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import Login from './components/Login/Login';
import { Route, Routes, Link, useNavigate, useLocation, Navigate, Outlet } from 'react-router-dom';
import useToken from './useToken';

export default function App() {
    const { token, setToken } = useToken();

    useEffect(() => {
        console.log("token view from App.js: ", token);
    }, [token])

    if(!token){
        return <Login setToken={setToken}/>
    }

    return (
        <AuthProvider>
            <div className="wrapper">
                <h1>Time Tracker</h1>
                
                <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                </Routes>
              
            </div>
        </AuthProvider>
    )
}

function AuthProvider({ children }) {
    return (
        {children}
    );
}
