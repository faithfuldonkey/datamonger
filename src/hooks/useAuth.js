import { useState, useEffect, useCallback, useRef } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

const REFRESH_BUFFER_MS = 5 * 60 * 1000; // Refresh 5 minutes before expiry

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const refreshTimeoutRef = useRef(null);
  const expiresAtRef = useRef(null);

  // Schedule token refresh before expiry
  const scheduleRefresh = useCallback((expiresIn) => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    const refreshTime = (expiresIn * 1000) - REFRESH_BUFFER_MS;
    if (refreshTime > 0) {
      expiresAtRef.current = Date.now() + (expiresIn * 1000);
      refreshTimeoutRef.current = setTimeout(() => {
        refreshAccessToken();
      }, refreshTime);
    }
  }, []);

  // Refresh access token using HTTP-only cookie
  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        console.log('Token refresh failed:', data.error);
        // Don't clear token here - let the user continue until it actually fails
        if (response.status === 401) {
          setAccessToken(null);
          setError('Session expired. Please sign in again.');
        }
        return null;
      }

      const data = await response.json();
      setAccessToken(data.access_token);
      scheduleRefresh(data.expires_in);
      setError(null);
      return data.access_token;
    } catch (err) {
      console.error('Error refreshing token:', err);
      return null;
    }
  }, [scheduleRefresh]);

  // Exchange authorization code for tokens
  const exchangeCode = useCallback(async (code) => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/exchange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          code,
          redirect_uri: window.location.origin,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.details || data.error || 'Token exchange failed');
      }

      const data = await response.json();
      setAccessToken(data.access_token);
      scheduleRefresh(data.expires_in);
      setError(null);
      return true;
    } catch (err) {
      console.error('Error exchanging code:', err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [scheduleRefresh]);

  // Google login hook with authorization code flow
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    onSuccess: async (codeResponse) => {
      await exchangeCode(codeResponse.code);
    },
    onError: (errorResponse) => {
      console.error('Google login failed:', errorResponse);
      setError('Google login failed. Please try again.');
      setLoading(false);
    },
  });

  // Logout function
  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Error during logout:', err);
    }

    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    setAccessToken(null);
    expiresAtRef.current = null;
  }, []);

  // Login wrapper
  const login = useCallback(() => {
    setLoading(true);
    setError(null);
    googleLogin();
  }, [googleLogin]);

  // Try to refresh token on mount (checks if we have a valid refresh token cookie)
  useEffect(() => {
    const tryRefresh = async () => {
      await refreshAccessToken();
      setLoading(false);
    };

    tryRefresh();

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [refreshAccessToken]);

  // Refresh token when page becomes visible again (e.g., user returns to tab/app)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && accessToken) {
        // Check if token is close to expiring or expired
        const now = Date.now();
        const expiresAt = expiresAtRef.current;

        if (expiresAt && (expiresAt - now) < REFRESH_BUFFER_MS) {
          refreshAccessToken();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [accessToken, refreshAccessToken]);

  return {
    accessToken,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!accessToken,
  };
};
