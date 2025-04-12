import styled from "styled-components";

export const StyledStatisticsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  margin: 0.3125rem 0;
  background: #fff;
  border-radius: 0.625rem;
  flex-shrink: 0;
  align-self: stretch;
  min-height: 4.5rem;
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
  align-items: flex-end;
  text-align: right;
  color: #000;
  font-size: 1rem;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
`;


export const DateRange = styled.div`
  font-size: 0.8125rem;
  color: #4caf50;
  font-style: italic;
  font-weight: 500;
  margin-top: 0.25rem;
`;