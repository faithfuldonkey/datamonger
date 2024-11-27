import React from "react";
import StatisticsContainer from "../StatisticsContainer/StatisticsContainer";

const AverageTimeBetween = ({ events }) => {
  const calculateAverageTime = () => {
    if (events.length < 2) return "N/A";

    let totalDifference = 0;
    for (let i = 0; i < events.length - 1; i++) {
      const date1 = new Date(events[i].start.dateTime || events[i].start.date);
      const date2 = new Date(events[i + 1].start.dateTime || events[i + 1].start.date);
      const difference = Math.abs(date2 - date1);
      totalDifference += difference;
    }

    const avgDiff = totalDifference / (events.length - 1);
    const hours = Math.floor(avgDiff / (1000 * 60 * 60));
    const minutes = Math.floor((avgDiff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hours ${minutes} minutes`;
  };

  return (
    <StatisticsContainer label="Average Between" data={calculateAverageTime()} />
  );
};

export default AverageTimeBetween;
