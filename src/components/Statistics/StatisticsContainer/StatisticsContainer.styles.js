import styled from "styled-components";

export const StyledStatisticsContainer = styled.div`
  display: flex;
  height: 4rem;
  padding: 0.9375rem 1.25rem; /* Match old padding */
  justify-content: space-between; /* Add space between label and data */
  align-items: center; /* Center vertically */
  flex-shrink: 0; /* Prevent shrinking */
  align-self: stretch; /* Stretch to the container width */
  border-radius: 0.625rem; /* Rounded corners */
  background: #fff; /* White background */
  margin: 0.3125rem 0; /* Vertical margin */
`;

export const StatisticsLabel = styled.span`
  color: #000; /* Black text */
  font-size: 1rem; /* Match old font size */
  font-family: "Inter", sans-serif; /* Font family */
  font-style: normal;
  font-weight: 400; /* Normal weight for label */
  line-height: 140%;
  text-align: left; /* Align label to the left */
`;

export const StatisticsData = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0; /* Prevent shrinking and allow full width */
  color: #000; /* Black text */
  text-align: right; /* Align data to the right */
  font-size: 1rem; /* Match old font size */
  font-family: "Inter", sans-serif; /* Font family */
  font-style: normal;
  font-weight: 700; /* Bold weight for data */
  line-height: 140%;
`;
