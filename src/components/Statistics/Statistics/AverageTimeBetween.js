import React from "react";
import StatisticsContainer from "../StatisticsContainer/StatisticsContainer";
import { formatTimeDifference } from "../../../utils/formatters";

const AverageTimeBetween = ({ events }) => {
  const calculateAverageTime = () => {
    if (events.length < 2) {
      return "N/A"; // Handle case where there are fewer than 2 events
    }

    let totalDifference = 0;
    for (let i = 0; i < events.length - 1; i++) {
      const date1 = new Date(events[i].start.dateTime || events[i].start.date);
      const date2 = new Date(events[i + 1].start.dateTime || events[i + 1].start.date);
      totalDifference += Math.abs(date2 - date1);
    }

    const avgDiff = totalDifference / (events.length - 1);
    return formatTimeDifference(avgDiff);
  };

  return (
    <StatisticsContainer label="Average Between" data={calculateAverageTime()} />
  );
};

export default AverageTimeBetween;
