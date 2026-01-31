import React from "react";
import StatisticsContainer from "../StatisticsContainer/StatisticsContainer";
import { formatDate } from "../../../utils/formatters";

const LongestStreakWithout = ({ events }) => {
  const calculateLongestStreakWithout = () => {
    if (events.length < 2) return "N/A";

    // Extract and normalize to unique calendar days
    const dayTimestamps = Array.from(
      new Set(
        events.map((e) => {
          const d = new Date(e.start.dateTime || e.start.date);
          d.setHours(0, 0, 0, 0);
          return d.getTime();
        })
      )
    ).sort((a, b) => a - b);

    let longestGap = 0;
    let bestStart = null;
    let bestEnd = null;

    for (let i = 1; i < dayTimestamps.length; i++) {
      const prev = dayTimestamps[i - 1];
      const curr = dayTimestamps[i];
      const gap = (curr - prev) / (1000 * 60 * 60 * 24) - 1;

      if (gap > longestGap) {
        longestGap = gap;
        bestStart = prev;
        bestEnd = curr;
      }
    }

    // Optional: check for gap between last event and today
    const lastEventDate = new Date(dayTimestamps[dayTimestamps.length - 1]);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const hasEventToday = dayTimestamps.includes(today.getTime());

    if (!hasEventToday) {
      const gap = (today - lastEventDate) / (1000 * 60 * 60 * 24);
      if (gap > longestGap) {
        longestGap = gap;
        bestStart = lastEventDate.getTime();
        bestEnd = today.getTime();
      }
    }

    if (longestGap < 1) return "N/A";

    return {
      streak: `${Math.floor(longestGap)} day${longestGap !== 1 ? "s" : ""}`,
      startDate: formatDate(new Date(bestStart)),
      endDate: formatDate(new Date(bestEnd)),
    };
  };

  return (
    <StatisticsContainer
      label="Longest Break"
      data={calculateLongestStreakWithout()}
    />
  );
};

export default LongestStreakWithout;
