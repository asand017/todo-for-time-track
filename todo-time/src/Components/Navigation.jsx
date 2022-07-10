import { useAuth } from "../custom_hooks/useAuth";
import { NavLink } from "react-router-dom";
import './Navigation.css';

export const Navigation = () => {
    const { token, onLogout } = useAuth();

    let activeStyle = {
        textDecoration: "underline"
    };

    let inActiveStyle = {
        textDecoration: "none"
    };

    return (
        <nav>
            <div className="container">
                <NavLink to="/dashboard" className="navlink" style={(({isActive}) => isActive ? activeStyle : inActiveStyle)}>Dashboard</NavLink>
                <NavLink to="/admin" className="navlink" style={(({isActive}) => isActive ? activeStyle : inActiveStyle)}>Admin</NavLink>
                {token && (
                    <NavLink to="/login" className="navlink" style={(({isActive}) => isActive ? activeStyle : inActiveStyle)} onClick={onLogout}>Sign Out</NavLink>
                )}
                {(!token) && (
                    <NavLink to="/login" className="navlink" style={(({isActive}) => isActive ? activeStyle : inActiveStyle)}>Sign In</NavLink>
                )}
            </div>
        </nav>
    )
}