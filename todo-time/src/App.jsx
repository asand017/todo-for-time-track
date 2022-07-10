import React from 'react';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import Home from './Components/Home';
import { NoMatch } from './NoMatch';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { Navigation } from './Components/Navigation';
import Login from './Components/Login/Login';
import Register from './Components/Login/Register';

export default function App() {
    return (
        <AuthProvider>
            <div className="wrapper">
                <h1>Time Tracker</h1>
                <Navigation />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="dashboard" element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } 
                    />
                    <Route path="admin" element={
                            <ProtectedRoute>
                                <Admin/>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NoMatch />} />
                </Routes>
              
            </div>
        </AuthProvider>
    )
}

const Admin = () => {
    return (
        <>
            <h2> Admin (Protected) </h2>
        </>
    )
}