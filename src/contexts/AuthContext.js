import React, { createContext, useContext, useState } from "react";
import { handleLoginSuccess, logout } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleAuthClick = (credentialResponse) => {
    const decodedUser = handleLoginSuccess(credentialResponse);
    if (decodedUser) {
      setUser(decodedUser); // Save decoded user info and token in memory
      console.log("User logged in:", decodedUser);
    } else {
      console.error("Failed to decode user.");
    }
  };

  const handleSignoutClick = () => {
    logout();
    setUser(null); // Clear user state
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
