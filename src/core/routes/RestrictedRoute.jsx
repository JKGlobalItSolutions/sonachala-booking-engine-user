import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RestrictedRoute = ({ allowedRoles }) => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // If roles are specified, check if user has permission
    if (allowedRoles && (!currentUser.role || !allowedRoles.includes(currentUser.role))) {
        // Redirect to home (or a dedicated unauthorized page) if role doesn't match
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default RestrictedRoute;
