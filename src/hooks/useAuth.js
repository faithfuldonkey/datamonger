/* global google */

import { useEffect, useState } from "react";
import { initializeGisClient, requestAccessToken } from "../services/authService";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const SCOPES = "https://www.googleapis.com/auth/calendar";

export const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    initializeGisClient(CLIENT_ID, SCOPES, (token) => {
      setAccessToken(token);
      setIsAuthorized(true);
    });
  }, []);

  const handleAuthClick = () => {
    requestAccessToken();
  };

  const handleSignoutClick = () => {
    console.log("Signing out...");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("calendarId");
    setAccessToken(null);
    setIsAuthorized(false);
    console.log("Signed out successfully.");
  };

  return { isAuthorized, accessToken, handleAuthClick, handleSignoutClick }; // Include handleSignoutClick
};
