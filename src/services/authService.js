/* global google */
import { loadGoogleApi } from "../utils/loadGoogleApi";

let tokenClient;
let accessToken = null;

export const initializeGisClient = (clientId, scopes, onSuccess) => {
  loadGoogleApi(() => {
    const savedToken = localStorage.getItem("accessToken");

    if (savedToken) {
      accessToken = savedToken;
      console.log("Restored access token from localStorage:", accessToken);

      validateToken(savedToken).then((isValid) => {
        if (isValid) {
          onSuccess(accessToken);
        } else {
          console.log("Token is invalid or expired. Prompting login...");
          tokenClient = createTokenClient(clientId, scopes, onSuccess);
        }
      });
    } else {
      tokenClient = createTokenClient(clientId, scopes, onSuccess);
    }
  });
};

const createTokenClient = (clientId, scopes, onSuccess) => {
  if (!window.google) {
    console.error("Google API not loaded yet.");
    return;
  }

  return google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: scopes,
    callback: (response) => {
      if (response.error) {
        console.error("Error during token callback:", response.error);
        return;
      }
      accessToken = response.access_token;
      localStorage.setItem("accessToken", accessToken);
      console.log("Access token received and saved:", accessToken);
      onSuccess(accessToken);
    },
  });
};

// Validate token via Google's tokeninfo endpoint
export const validateToken = async (token) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.expires_in > 0; // Token is valid if it has not expired
    }
    console.error("Token validation failed:", response.statusText);
    return false;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
};

export const requestAccessToken = (callback) => {
  if (!tokenClient) {
    console.error("Token client is not initialized. Call initializeGisClient first.");
    return;
  }
  console.log("Requesting access token...");
  tokenClient.requestAccessToken({
    prompt: accessToken ? "" : "consent",
    callback: () => {
      if (callback) callback(); // Execute the callback after receiving the token
    },
  });
};


export const loadCalendarList = async (accessToken) => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/users/me/calendarList",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

export const listEvents = async (accessToken, calendarId, timeMin, timeMax) => {
  try {
    let events = [];
    let nextPageToken = null;

    do {
      const url = new URL(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`
      );
      url.searchParams.append("timeMin", timeMin);
      url.searchParams.append("timeMax", timeMax);
      url.searchParams.append("showDeleted", "false");
      url.searchParams.append("singleEvents", "true");
      url.searchParams.append("orderBy", "startTime");
      if (nextPageToken) {
        url.searchParams.append("pageToken", nextPageToken);
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.statusText}`);
      }

      const data = await response.json();
      events = events.concat(data.items || []);
      nextPageToken = data.nextPageToken || null; // Get the next page token
    } while (nextPageToken); // Continue fetching if there's a next page

    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const fetchAllEvents = async (accessToken, calendarId, timeMin, timeMax) => {
  try {
      let events = [];
      let nextPageToken = null;
      let apiCallCount = 0; // Initialize a counter for API calls

      do {
          apiCallCount++; // Increment the counter for each API call
          console.log(`API Call #${apiCallCount}: Fetching events...`);

          const response = await fetch(
              `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime&maxResults=2500${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`,
              {
                  headers: {
                      Authorization: `Bearer ${accessToken}`,
                  },
              }
          );

          if (!response.ok) {
              throw new Error(`Failed to fetch events: ${response.statusText}`);
          }

          const data = await response.json();
          events = [...events, ...data.items];
          nextPageToken = data.nextPageToken;

          console.log(`API Call #${apiCallCount}: Retrieved ${data.items.length} events.`);
      } while (nextPageToken);

      console.log(`Total API Calls Made: ${apiCallCount}`);
      return events;
  } catch (error) {
      console.error("Error fetching events:", error);
      return [];
  }
};

