import React, { createContext, useContext, useState, useCallback } from "react";
import { initializeGisClient, requestAccessToken } from "../services/authService";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const SCOPES = "https://www.googleapis.com/auth/calendar";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleAuthClick = useCallback(() => {
    requestAccessToken();
  }, []);

  const initializeAuth = useCallback(() => {
    initializeGisClient(CLIENT_ID, SCOPES, () => {
      setIsAuthorized(true);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthorized, handleAuthClick, initializeAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
