import { useAuth } from "../custom_hooks/useAuth";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
    const { token, onLogout } = useAuth();

    return (
        <nav>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/admin">Admin</NavLink>

            {token && (
                <button type="button" onClick={onLogout}>
                    Sign Out
                </button>
            )}
        </nav>
    )
}