import React from "react";
import StatisticsContainer from "../StatisticsContainer/StatisticsContainer";

const TimeSinceLast = ({ events }) => {
  const calculateTimeSinceLast = () => {
    const lastEvent = events[events.length - 1];
    const now = new Date();
    const lastEventDate = new Date(lastEvent.start.dateTime || lastEvent.start.date);
    const diff = Math.abs(now - lastEventDate);
    return Math.floor(diff / (1000 * 60 * 60 * 24)); // Days
  };

  return (
    <StatisticsContainer
      label="Time Since Last"
      data={`${calculateTimeSinceLast()} days`}
    />
  );
};

export default TimeSinceLast;
