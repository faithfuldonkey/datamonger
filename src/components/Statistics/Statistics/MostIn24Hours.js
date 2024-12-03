import React from "react";
import StatisticsContainer from "../StatisticsContainer/StatisticsContainer";

const MostIn24Hours = ({ events }) => {
  const calculateMostIn24Hours = () => {
    if (events.length === 0) {
      return "N/A"; // Handle empty event list
    }

    // Sort events by date (newest to oldest)
    const sortedEvents = events
      .slice()
      .sort(
        (a, b) =>
          new Date(a.start.dateTime || a.start.date) -
          new Date(b.start.dateTime || b.start.date)
      );

    let maxCount = 0;

    for (let i = 0; i < sortedEvents.length; i++) {
      const currentEventDate = new Date(
        sortedEvents[i].start.dateTime || sortedEvents[i].start.date
      );
      let count = 1;

      for (let j = i + 1; j < sortedEvents.length; j++) {
        const nextEventDate = new Date(
          sortedEvents[j].start.dateTime || sortedEvents[j].start.date
        );
        const timeDifference = Math.abs(
          nextEventDate - currentEventDate
        ) / (1000 * 60 * 60);

        if (timeDifference <= 24) {
          count++;
        } else {
          break;
        }
      }

      maxCount = Math.max(maxCount, count);
    }

    return `${maxCount} event${maxCount > 1 ? "s" : ""}`;
  };

  return (
    <StatisticsContainer label="Most in 24 Hours" data={calculateMostIn24Hours()} />
  );
};

export default MostIn24Hours;
