"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AuthContextType } from "@/types/authContext";
import { User } from "@/types/user";

// Create context with default value
const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook for easy consumption
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

// Define AuthProvider props type
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("geomap_auth");

    if (token) {
      const verifyToken = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/validation`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            const data: User = await response.json();
            setUser(data);
          } else {
            if (response.status === 403) {
              localStorage.removeItem("geomap_auth")
            };
            setUser(null);
          }
        } catch (error) {
          console.log("Token verification error:", error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      };

      verifyToken();
    } else {
      setLoading(false);
    }
  }, []);

  const signin = async (email: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok && data.geomap_auth) {
        localStorage.setItem("geomap_auth", data.geomap_auth);
        toast.success("Signin Successful");
        setTimeout(() => window.location.href = "/dashboard", 1000);
      } else {
        throw new Error(data.detail || "Signin Error");
      }
    } catch (error) {
      console.log(error);
      toast.error(error instanceof Error ? error.message : "Signin Error");
    }
  };

  const signup = async (name: string, email: string, phone: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.detail);
        setTimeout(() => router.push(`/verify-email-sent?email=${encodeURIComponent(email)}`), 5000);
      } else {
        throw new Error(data.detail || "Signup Error");
      }
    } catch (error) {
      console.log(error);
      toast.error(error instanceof Error ? error.message : "Signup Error");
    }
  };

  const signout = async () => {
    try {
      const token = localStorage.getItem("geomap_auth");
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem("geomap_auth");
      toast.success("Signout Successful");
      setUser(null);
      router.push("/signin");
    } catch (error) {
      console.log(error);
      toast.error("Failed To Signout");
    }
  };

  const forgetPassword = async (email: string, phone: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.detail || "Reset link sent! Check your email.");
        setTimeout(() => router.push("/signin"), 1000);
      } else {
        throw new Error(data.detail);
      }
    } catch (error) {
      console.log(error);
      toast.error(error instanceof Error ? error.message : "Error sending reset link.");
    }
  };

  const resetPassword = async (token: string, password: string, confirmPassword: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/reset-password?token=${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, confirmPassword }),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        toast.success(data.detail || "Password reset successful!");
        setTimeout(() => {
          router.push("/signin");
        }, 1000);
      } else {
        throw new Error(data.detail || "Failed to reset password");
      }
    } catch (error) {
      console.log(error);
      toast.error(error instanceof Error ? error.message : "Failed to reset password");
    }
  };

  const verifyOTP = async (token: string, otp: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/verify-otp?token=${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();

      if (response.status === 302) {
        toast.error('Invalid OTP or token');
        setTimeout(() => {
          window.location.href = data.detail;
        }, 2000);
        return;
      }

      if (response.ok) {
        toast.success(data.detail || "OTP Verified! Redirecting to signin...");
        setTimeout(() => router.push("/signin"), 1000);
      }
      else {
        throw new Error(data.detail || "Invalid OTP or token");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "OTP Verification Failed!");
    }
  };

  const sendResetEmail = async (password: string) => {
    try {
      const token = localStorage.getItem("geomap_auth");
      if (!token) throw new Error("User not authenticated");

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/send-reset-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        toast.success(data.detail || "Reset email sent successfully.");
        setTimeout(() => router.refresh(), 1000);
      } else {
        throw new Error(data.detail || "Failed to send reset email.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send reset email.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signin, signup, signout, forgetPassword, resetPassword, verifyOTP, sendResetEmail }}>
      {children}
    </AuthContext.Provider>
  );
}