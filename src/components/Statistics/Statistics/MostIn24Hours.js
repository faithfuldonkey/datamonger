import React from "react";
import StatisticsContainer from "../StatisticsContainer/StatisticsContainer";
import { formatDate } from "../../../utils/formatters";

const MostIn24Hours = ({ events }) => {
  const calculateMostIn24Hours = () => {
    if (events.length === 0) return "N/A";

    const sortedEvents = events
      .slice()
      .sort(
        (a, b) =>
          new Date(a.start.dateTime || a.start.date) -
          new Date(b.start.dateTime || b.start.date)
      );

    let maxCount = 0;
    let maxStart = null;

    for (let i = 0; i < sortedEvents.length; i++) {
      const start = new Date(
        sortedEvents[i].start.dateTime || sortedEvents[i].start.date
      );
      let count = 1;

      for (let j = i + 1; j < sortedEvents.length; j++) {
        const current = new Date(
          sortedEvents[j].start.dateTime || sortedEvents[j].start.date
        );
        const diffHours = (current - start) / (1000 * 60 * 60);
        if (diffHours <= 24) {
          count++;
        } else {
          break;
        }
      }

      if (count > maxCount) {
        maxCount = count;
        maxStart = start;
      }
    }

    return {
      streak: `${maxCount} event${maxCount > 1 ? "s" : ""}`,
      startDate: maxStart,
    };
  };

  return (
    <StatisticsContainer
      label="Most in 24 Hours"
      data={calculateMostIn24Hours()}
    />
  );
};

export default MostIn24Hours;
