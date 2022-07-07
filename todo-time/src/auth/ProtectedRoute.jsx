import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../custom_hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/home" replace state={{ from: location }} />
    }

    return children;
}