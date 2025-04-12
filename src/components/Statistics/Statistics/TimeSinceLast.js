import React from "react";
import StatisticsContainer from "../StatisticsContainer/StatisticsContainer";
import { getTimeDifferenceFormats } from "../../../utils/formatters";

const TimeSinceLast = ({ events }) => {
  const calculateTimeSinceLast = () => {
    if (events.length === 0) return "N/A";

    const lastEvent = events[events.length - 1];
    if (!lastEvent || !lastEvent.start) return "N/A";

    const now = new Date();
    const lastEventDate = new Date(lastEvent.start.dateTime || lastEvent.start.date);
    const diff = Math.abs(now - lastEventDate);

    const formats = getTimeDifferenceFormats(diff);

    return { streak: formats }; // 👈 an array now
  };

  return (
    <StatisticsContainer label="Time Since Last" data={calculateTimeSinceLast()} />
  );
};

export default TimeSinceLast;
