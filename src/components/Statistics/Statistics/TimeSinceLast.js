import React from "react";
import StatisticsContainer from "../StatisticsContainer/StatisticsContainer";
import { formatTimeDifference } from "../../../utils/formatters";

const TimeSinceLast = ({ events }) => {
  const calculateTimeSinceLast = () => {
    if (events.length === 0) {
      return "N/A"; // Handle empty event array
    }

    const lastEvent = events[events.length - 1];
    if (!lastEvent || !lastEvent.start) {
      return "N/A"; // Handle missing or malformed event data
    }

    const now = new Date();
    const lastEventDate = new Date(lastEvent.start.dateTime || lastEvent.start.date);
    const diff = Math.abs(now - lastEventDate);

    return formatTimeDifference(diff);
  };

  return (
    <StatisticsContainer
      label="Time Since Last"
      data={calculateTimeSinceLast()}
    />
  );
};

export default TimeSinceLast;
