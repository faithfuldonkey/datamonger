/* global gapi */

export const initializeGapiClient = async (apiKey, discoveryDocs) => {
    return new Promise((resolve, reject) => {
      gapi.load("client", async () => {
        try {
          await gapi.client.init({
            apiKey,
            discoveryDocs,
          });
          resolve(true);
        } catch (error) {
          console.error("Error initializing gapi client:", error);
          reject(error);
        }
      });
    });
  };  

export const listUpcomingEvents = async (calendarId, startDate, endDate, eventCount) => {
    try {
      const request = {
        calendarId: calendarId,
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: eventCount,
        orderBy: "startTime",
      };
      const response = await window.gapi.client.calendar.events.list(request);
      return response.result.items || [];
    } catch (err) {
      console.error("Error fetching events", err.message);
      return [];
    }
  };
  
  export const loadCalendarList = async () => {
    try {
      const response = await gapi.client.calendar.calendarList.list();
      return response.result.items.map((item) => ({
        id: item.id,
        summary: item.summary,
      }));
    } catch (err) {
      console.error("Error loading calendar list", err);
      return [];
    }
  };
  