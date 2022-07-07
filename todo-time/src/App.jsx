import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import { Home } from './components/Home';
import { NoMatch } from './NoMatch';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { Navigation } from './components/Navigation';

export default function App() {
    return (
        <AuthProvider>
            <div className="wrapper">
                <h1>Time Tracker</h1>
                <Navigation />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
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