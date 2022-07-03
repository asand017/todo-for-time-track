import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import Login from './components/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useToken from './useToken';

function App() {
    const { token, setToken } = useToken();

    if(!token){
        return <Login setToken={setToken}/>
    }

    return (
        <div className="wrapper">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/preferences" element={<Preferences />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

function Home() {
    return(
        <div>
            <h1>Time Tracker</h1>
        </div>
    )
}

export default App;