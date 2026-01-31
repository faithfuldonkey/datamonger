// eslint-disable-next-line no-unused-vars
let _accessToken = null;

// Handle login success and store token in memory
export const handleLoginSuccess = (credentialResponse) => {
  const token = credentialResponse?.credential;
  if (!token) {
    console.error("No credential provided.");
    return null;
  }

  _accessToken = token; // Store the token in memory
  console.log("Access token received:", token);

  return { token }; // Return the token for further use
};

// Clear access token from memory
export const logout = () => {
  _accessToken = null;
  console.log("User logged out and token cleared.");
};

// Fetch events from a calendar
export const fetchAllEvents = async (token, calendarId, timeMin, timeMax) => {
  if (!token) {
    console.error("Access token not available. Authenticate first.");
    return [];
  }
  try {
    console.log("Fetching events with:", { token, calendarId, timeMin, timeMax });
    const url = new URL(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`
    );
    url.searchParams.append("timeMin", timeMin);
    url.searchParams.append("timeMax", timeMax);
    url.searchParams.append("singleEvents", "true");
    url.searchParams.append("orderBy", "startTime");

    // Fetch data from Google Calendar API
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Ensure correct formatting
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to fetch events: ${response.status} - ${errorText}`);
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
