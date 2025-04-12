import React from "react";
import StatisticsContainer from "../StatisticsContainer/StatisticsContainer";
import { formatDate } from "../../../utils/formatters";

const LongestDailyStreak = ({ events }) => {
  const calculateLongestStreak = () => {
    if (events.length === 0) return "N/A";

    // Extract only dates and normalize to start of day
    const dateSet = new Set(
      events.map((e) => {
        const d = new Date(e.start.dateTime || e.start.date);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
      })
    );

    // Convert to sorted array of unique day timestamps
    const sortedDays = Array.from(dateSet).sort((a, b) => a - b);

    let longestStreak = 1;
    let currentStreak = 1;
    let tempStart = sortedDays[0];
    let bestStart = sortedDays[0];
    let bestEnd = sortedDays[0];

    for (let i = 1; i < sortedDays.length; i++) {
      const diffDays = (sortedDays[i] - sortedDays[i - 1]) / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        currentStreak++;
      } else {
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
          bestStart = tempStart;
          bestEnd = sortedDays[i - 1];
        }
        currentStreak = 1;
        tempStart = sortedDays[i];
      }
    }

    // Final check at end
    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
      bestStart = tempStart;
      bestEnd = sortedDays[sortedDays.length - 1];
    }

    return {
      streak: `${longestStreak} day${longestStreak > 1 ? "s" : ""}`,
      startDate: formatDate(new Date(bestStart)),
      endDate: formatDate(new Date(bestEnd)),
    };
  };

  return (
    <StatisticsContainer
      label="Longest Streak"
      data={calculateLongestStreak()}
    />
  );
};

export default LongestDailyStreak;
