import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeAuth, handleLoginSuccess, logout } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Initialize the authentication state
    initializeAuth().then((decodedUser) => {
      if (decodedUser) {
        setUser(decodedUser);
      }
    });
  }, []);

  const handleAuthClick = (credentialResponse) => {
    const decodedUser = handleLoginSuccess(credentialResponse);
    if (decodedUser) {
      setUser(decodedUser);
    } else {
      console.error("Failed to decode user");
    }
  };

  const handleSignoutClick = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthorized: !!user,
        handleAuthClick,
        handleSignoutClick,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
