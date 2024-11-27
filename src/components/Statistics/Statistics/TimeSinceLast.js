import React from "react";
import StatisticsContainer from "../StatisticsContainer/StatisticsContainer";
import { formatTimeDifference } from "../../../utils/formatters";

const TimeSinceLast = ({ events }) => {
  const calculateTimeSinceLast = () => {
    const lastEvent = events[events.length - 1];
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
