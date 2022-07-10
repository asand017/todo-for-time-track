import React, { useState } from 'react';
import { useAuth } from "../custom_hooks/useAuth";
import { NavLink } from "react-router-dom";

export default function Home () {
    const { token } = useAuth();

    return (
        <>
            <h2>Home Page</h2>
            {(!token) && <button><NavLink to="/login" style={{textDecoration: 'none', color: 'black'}}>Sign In</NavLink></button>}
        </>
    )
}