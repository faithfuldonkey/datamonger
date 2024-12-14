import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const calendarId = "c_df81fe5a7834b103d42948781e8fa7a770ad7615ff8ed586e401d8d0c1a9b855@group.calendar.google.com";

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Access Token:", tokenResponse.access_token);
      // Store the token and expiry time
      const expiryTime = new Date().getTime() + tokenResponse.expires_in * 1000;
      localStorage.setItem('googleAccessToken', tokenResponse.access_token);
      localStorage.setItem('tokenExpiry', expiryTime.toString());
      setAccessToken(tokenResponse.access_token);
    },
    onError: () => console.error("Login Failed"),
    scope: "https://www.googleapis.com/auth/calendar.readonly",
    persistence: true, // Enable token persistence
  });

  const fetchAllEvents = async (token, calendarId, timeMin, timeMax) => {
    try {
      console.log("Fetching events with:", { token, calendarId, timeMin, timeMax });
      const url = new URL(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`
      );
      url.searchParams.append("timeMin", timeMin);
      url.searchParams.append("timeMax", timeMax);
      url.searchParams.append("singleEvents", "true");
      url.searchParams.append("orderBy", "startTime");

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Failed to fetch events: ${response.status}`, errorData);
        // If token is invalid, clear storage and reset state
        if (response.status === 401) {
          localStorage.removeItem('googleAccessToken');
          localStorage.removeItem('tokenExpiry');
          setAccessToken(null);
        }
        return [];
      }

      const data = await response.json();
      console.log("Fetched events:", data.items);
      return data.items || [];
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  };

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('googleAccessToken');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    
    if (storedToken && tokenExpiry) {
      const isExpired = new Date().getTime() > parseInt(tokenExpiry);
      if (!isExpired) {
        setAccessToken(storedToken);
      } else {
        // Clear expired token
        localStorage.removeItem('googleAccessToken');
        localStorage.removeItem('tokenExpiry');
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (accessToken) {
      setLoading(true);
      fetchAllEvents(
        accessToken,
        calendarId,
        "1970-01-01T00:00:00Z",
        new Date().toISOString()
      )
        .then((fetchedEvents) => {
          setEvents(fetchedEvents);
        })
        .catch((err) => console.error("Failed to fetch events:", err))
        .finally(() => setLoading(false));
    }
  }, [accessToken]);

  const handleLogout = () => {
    localStorage.removeItem('googleAccessToken');
    localStorage.removeItem('tokenExpiry');
    setAccessToken(null);
    setEvents([]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!accessToken) {
    return (
      <div>
        <h1>Login to Access Calendar</h1>
        <button onClick={() => login()}>Sign in with Google</button>
      </div>
    );
  }

  return (
    <div>
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Calendar Events</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              {event.summary} - {event.start.dateTime || event.start.date}
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found</p>
      )}
    </div>
  );
};

export default App;