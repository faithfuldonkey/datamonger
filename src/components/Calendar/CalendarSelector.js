import React from "react";

const CalendarSelector = ({ calendars, selectedCalendarId, onCalendarChange }) => {
  return (
    <div>
      <h2>Select a Calendar</h2>
      <select value={selectedCalendarId} onChange={(e) => onCalendarChange(e.target.value)}>
        {calendars.map((calendar) => (
          <option key={calendar.id} value={calendar.id}>
            {calendar.summary}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CalendarSelector;
