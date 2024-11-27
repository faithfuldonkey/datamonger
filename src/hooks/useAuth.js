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
      console.log("Authorized with token:", token);
      setAccessToken(token);
      setIsAuthorized(true);
    });
  }, []);

  const handleAuthClick = () => {
    requestAccessToken();
  };

  return { isAuthorized, accessToken, handleAuthClick };
};