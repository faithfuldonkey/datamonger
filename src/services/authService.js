import { jwtDecode } from "jwt-decode";

let accessToken = null;

// Save access token and decoded user info
export const handleLoginSuccess = (credentialResponse) => {
  const token = credentialResponse?.credential;
  if (!token) {
    console.error("No credential provided.");
    return null;
  }

  accessToken = token;
  localStorage.setItem("accessToken", token);

  const decodedUser = jwtDecode(token);
  console.log("Decoded user information:", decodedUser);

  return decodedUser;
};

// Retrieve the saved token and validate it
export const initializeAuth = async () => {
  const savedToken = localStorage.getItem("accessToken");
  if (savedToken) {
    accessToken = savedToken;
    const isValid = await validateToken(savedToken);
    if (isValid) {
      console.log("Restored and validated access token from localStorage.");
      return jwtDecode(savedToken);
    } else {
      console.warn("Saved token is invalid or expired.");
      localStorage.removeItem("accessToken");
    }
  }
  return null;
};

// Validate token using Google's tokeninfo endpoint
const validateToken = async (token) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.expires_in > 0; // Token is valid if not expired
    }
    console.warn("Token validation failed:", response.statusText);
    return false;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
};

// Clear access token from localStorage and memory
export const logout = () => {
  localStorage.removeItem("accessToken");
  accessToken = null;
  console.log("User logged out and token cleared.");
};

// Fetch calendar list
export const loadCalendarList = async (token) => {
  if (!token) {
    console.error("Access token not available. Authenticate first.");
    return [];
  }
  try {
    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/users/me/calendarList",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch calendar list: ${response.statusText}`);
    }
    const data = await response.json();
    return data.items.map((calendar) => ({
      id: calendar.id,
      summary: calendar.summary,
    }));
  } catch (error) {
    console.error("Error loading calendar list:", error);
    return [];
  }
};

// Fetch events from a calendar
export const fetchAllEvents = async (token, calendarId, timeMin, timeMax) => {
  if (!token) {
    console.error("Access token not available. Authenticate first.");
    return [];
  }
  try {
    let events = [];
    let nextPageToken = null;

    do {
      const url = new URL(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`
      );
      url.searchParams.append("timeMin", timeMin);
      url.searchParams.append("timeMax", timeMax);
      url.searchParams.append("singleEvents", "true");
      url.searchParams.append("orderBy", "startTime");
      if (nextPageToken) {
        url.searchParams.append("pageToken", nextPageToken);
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.statusText}`);
      }

      const data = await response.json();
      events = events.concat(data.items || []);
      nextPageToken = data.nextPageToken || null;
    } while (nextPageToken);

    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};
