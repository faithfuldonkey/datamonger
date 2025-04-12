import React, { useState } from "react";
import {
  StyledStatisticsContainer,
  StatisticsLabel,
  StatisticsData,
  DateRange,
} from "./StatisticsContainer.styles";
import { formatDate } from "../../../utils/formatters";

const StatisticsContainer = ({ label, data, onClick }) => {
  const [index, setIndex] = useState(0);

  let dataDisplay = data;
  let startDateDisplay = null;
  let endDateDisplay = null;

  if (typeof data === "object" && data !== null) {
    const { streak, startDate, endDate } = data;

    if (Array.isArray(streak)) {
      dataDisplay = streak[index % streak.length];
    } else {
      dataDisplay = streak || "N/A";
    }

    startDateDisplay = startDate ? formatDate(startDate, "short") : null;
    endDateDisplay = endDate ? formatDate(endDate, "short") : null;
  }

  const handleClick = () => {
    if (typeof data === "object" && Array.isArray(data?.streak)) {
      setIndex((prev) => prev + 1);
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <StyledStatisticsContainer onClick={handleClick}>
      <StatisticsLabel>{label}</StatisticsLabel>
      <StatisticsData>
        {dataDisplay || "N/A"}
        {startDateDisplay && (
          <DateRange>
            {startDateDisplay}
            {endDateDisplay ? ` – ${endDateDisplay}` : ""}
          </DateRange>
        )}
      </StatisticsData>
    </StyledStatisticsContainer>
  );
};

export default StatisticsContainer;
