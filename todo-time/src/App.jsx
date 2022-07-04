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
            <h1>Time Tracker</h1>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />}>
                        <Route path="/preferences" element={<Preferences />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;