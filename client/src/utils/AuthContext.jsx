import React, { createContext, useState, useContext } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    email: localStorage.getItem("email") || "",
    usertype: localStorage.getItem("usertype") || "3", // Default to guest type
  });

  // Function to update auth state
  const updateAuthState = (newState) => {
    setAuthState((prev) => ({ ...prev, ...newState }));

    // Update localStorage for persistence
    if (newState.isAuthenticated !== undefined) {
      localStorage.setItem("isAuthenticated", newState.isAuthenticated);
    }
    if (newState.email) {
      localStorage.setItem("email", newState.email);
    }
    if (newState.usertype) {
      localStorage.setItem("usertype", newState.usertype);
    }
  };

  return (
    <AuthContext.Provider value={{ authState, updateAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
