/* global google */

let tokenClient;
let accessToken = null;

export const initializeGisClient = (clientId, scopes, onSuccess) => {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: scopes,
    callback: (response) => {
      if (response.error) {
        console.error("Error during token callback:", response.error);
        return;
      }
      accessToken = response.access_token;
      console.log("Access token received:", accessToken);
      onSuccess(accessToken);
    },
  });
};

export const requestAccessToken = () => {
  if (!accessToken) {
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    tokenClient.requestAccessToken({ prompt: "" });
  }
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
  