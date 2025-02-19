import React, { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

// Create the context
const AuthContext = createContext()

// Custom hook for easy context consumption
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setloading] = useState(true);

    const navigate = useNavigate();

    // On component mount, check localStorage for saved user
    useEffect(() => {
        const token = localStorage.getItem('geomap_auth');

        if (token) {
            const verifyToken = async () => {
                try {
                    const response = await fetch('https://primary-production-af7f.up.railway.app/webhook/geomap/validation', {
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${token}`, // Include the token
                        },
                    });

                    console.log('VERIFY_RESPONSE IS', response);

                    if (response.ok) {

                        const data = await response.json();

                        console.log('DATA: ', data);

                        setUser(data); // Token is valid, set the user data.
                    } else {
                        // Only remove the token if the server returns 403 (or another code that indicates an invalid token)
                        if (response.status === 403) {
                            localStorage.removeItem('geomap_auth');
                        }
                        setUser(null);
                    }
                } catch (error) {
                    console.error('Token verification error:', error);
                    setUser(null);
                } finally {
                    setloading(false);
                }
            };

            verifyToken();
        } else {
            setloading(false);
        }
    }, []);


    // Function to login the user
    const login = async (email, password) => {
        try {
            const response = await fetch('https://primary-production-af7f.up.railway.app/webhook/geomap/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            console.log('DATA', data);

            if (response.ok && data.geomap_auth) {
                // Store the token in localStorage
                localStorage.setItem('geomap_auth', data.geomap_auth)
                // setUser({ email }) // Store user details
                toast.success("Login Successful");
                setTimeout(() => {
                    window.location.href = '/dashboard' // Redirect to protected route
                }, 1000)
            } else {
                throw new Error(data.message || "Login Error");
            }
        } catch (error) {
            console.log(error);
            toast.error("Login Error");
        }
    }

    // Function for signup
    const signup = async (name, email, phone, password) => {
        try {
            const response = await fetch('https://primary-production-af7f.up.railway.app/webhook/geomap/sign-up?path=signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone, password }),
            })

            console.log("SIGNUP RESPONSE", response);

            const data = await response.json();

            console.log("SIGNUP DATA", data);

            if (response.ok) {
                toast.success("Verification link sent! Check your email.");
                setTimeout(() => {
                    navigate(`/verify-email?email=${encodeURIComponent(email)}`);
                }, 5000);
            } else {
                throw new Error("Signup Error");
            }
        } catch (error) {
            console.error('Signup Error:', error)
            toast.error('Signup Error');
        }
    }

    // Function to logout the user
    const logout = () => {
        toast.success("Logout Successful");
        localStorage.removeItem('geomap_auth')
        setUser(null)
        navigate('/login')
    }

    // Function to forget Password of user
    const forgetPassword = async (email, phone) => {
        try {
            const response = await fetch('https://primary-production-af7f.up.railway.app/webhook/geomap/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, phone }),
            });

            console.log('Forgot Password Response:', response);

            if (response.ok) {
                toast.success("Reset link sent! Check your email.");
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }
            else {
                throw new Error("Failed to send reset link.");
            }
        } catch (error) {
            console.error('Forgot Password Error:', error);
            toast.error("Error sending reset link. Try again.");
        }
    };

    const value = { user, loading, login, signup, logout, forgetPassword }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
