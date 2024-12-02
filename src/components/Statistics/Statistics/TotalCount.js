import React from "react";
import StatisticsContainer from "../StatisticsContainer/StatisticsContainer";

const TotalCount = ({ events }) => {
  return <StatisticsContainer label="Total Count" data={events.length || "N/A"} />;
};

export default TotalCount;
