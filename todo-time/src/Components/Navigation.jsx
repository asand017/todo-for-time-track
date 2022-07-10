import { useAuth } from "../custom_hooks/useAuth";
import { NavLink } from "react-router-dom";
import './Navigation.css';

export const Navigation = () => {
    const { token, onLogout } = useAuth();

    return (
        <nav>
            <div className="container">
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/admin">Admin</NavLink>
            </div>

            {token && (
                <button type="button" onClick={onLogout}>
                    Sign Out
                </button>
            )}
        </nav>
    )
}