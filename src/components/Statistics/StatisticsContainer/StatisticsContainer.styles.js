import styled from "styled-components";

export const StyledStatisticsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  margin: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const StatisticsLabel = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #666;
`;

export const StatisticsData = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 4px;
`;
