import React from "react";
import Chart from "react-apexcharts";
import { StyledChartContainer } from "./ChartWrapper.styles";

const ChartWrapper = ({ options, series, type, height }) => (
  <StyledChartContainer>
    <Chart options={options} series={series} type={type} height={height} />
  </StyledChartContainer>
);

export default ChartWrapper;
