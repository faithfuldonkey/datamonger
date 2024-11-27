import React from "react";
import { StyledStatisticsContainer, StatisticsLabel, StatisticsData } from "./StatisticsContainer.styles";

const StatisticsContainer = ({ label, data, onClick }) => (
  <StyledStatisticsContainer onClick={onClick}>
    <StatisticsLabel>{label}</StatisticsLabel>
    <StatisticsData>{data || "N/A"}</StatisticsData>
  </StyledStatisticsContainer>
);

export default StatisticsContainer;
