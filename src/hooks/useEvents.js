import { useState, useEffect } from "react";
import { listUpcomingEvents } from "../services/api";

export const useEvents = (calendarId, startDate, endDate, eventCount) => {
  const [events, setEvents] = useState([]);
  const [uniqueTitles, setUniqueTitles] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const items = await listUpcomingEvents(calendarId, startDate, endDate, eventCount);
      setEvents(items);
      setUniqueTitles([...new Set(items.map((event) => event.summary))]);
    };
    fetchEvents();
  }, [calendarId, startDate, endDate, eventCount]);

  return { events, uniqueTitles, setEvents };
};
