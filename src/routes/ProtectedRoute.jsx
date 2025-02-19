import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth()

    // Show loading spinner while checking auth
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    // If user is not authenticated, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute
