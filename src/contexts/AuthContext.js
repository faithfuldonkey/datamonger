import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeGisClient, requestAccessToken } from "../services/authService";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const SCOPES = "https://www.googleapis.com/auth/calendar";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Initialize the GIS client and check for saved token
    initializeGisClient(CLIENT_ID, SCOPES, (token) => {
      setIsAuthorized(true); // Token is valid, mark as authorized
    });
  }, []);

  const handleAuthClick = () => {
    requestAccessToken();
  };

  const handleSignoutClick = () => {
    console.log("Signing out...");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("calendarId");
    setIsAuthorized(false);
  
    // Confirm that state updates asynchronously
    setTimeout(() => {
      console.log("isAuthorized (after state update):", isAuthorized); // Should be false
    }, 0);
  };
  
  

  return (
    <AuthContext.Provider
      value={{
        isAuthorized,
        handleAuthClick,
        handleSignoutClick,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
