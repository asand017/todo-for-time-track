import React from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { NoMatch } from "./NoMatch";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { Navigation } from "./Components/Navigation";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import { Container } from "@mui/material";

export default function App() {
  return (
    <AuthProvider>
      <Container maxWidth="md">
        <div className="header">
          <h1>Time Tracker</h1>
          <Navigation />
        </div>
        <Routes>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Container>
    </AuthProvider>
  );
}

const Admin = () => {
  return (
    <>
      <h2> Admin </h2>
      <p>Coming soon...</p>
    </>
  );
};
