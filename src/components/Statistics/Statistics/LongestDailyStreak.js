import React from "react";
import StatisticsContainer from "../StatisticsContainer/StatisticsContainer";

const LongestDailyStreak = ({ events }) => {
  const calculateLongestStreak = () => {
    if (events.length === 0) {
      return "N/A"; 
    }

    
    const sortedEvents = events
      .slice()
      .sort(
        (a, b) =>
          new Date(b.start.dateTime || b.start.date) -
          new Date(a.start.dateTime || a.start.date)
      );

    let longestStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < sortedEvents.length; i++) {
      const prevEventDate = new Date(
        sortedEvents[i - 1].start.dateTime || sortedEvents[i - 1].start.date
      );
      const currentEventDate = new Date(
        sortedEvents[i].start.dateTime || sortedEvents[i].start.date
      );

      
      const timeDifference = Math.abs(
        currentEventDate - prevEventDate
      ) / (1000 * 60 * 60);

      if (timeDifference <= 24) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 1; 
      }
    }

    return `${longestStreak} day${longestStreak > 1 ? "s" : ""}`;
  };

  return (
    <StatisticsContainer label="Longest Daily Streak" data={calculateLongestStreak()} />
  );
};

export default LongestDailyStreak;
