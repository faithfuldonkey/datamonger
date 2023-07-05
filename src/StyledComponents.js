import styled from "styled-components";

export const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const MainPage = styled.div`
  display: flex;
  width: 100%;
  max-width: 50%; /* Added this line */
  padding: 2rem;
  flex-direction: column;
  align-items: flex-start;
  background: #F8F8F8;
  
  /* Responsive design: Adjust for smaller screens */
  @media (max-width: 768px) { /* This is generally the breakpoint for tablets and below */
    max-width: 90%;
  }
`;

export const TrackerFrame = styled.div`
  display: flex;
  width: 100%; /* Added this line */
  margin: 1rem 0;
  align-items: flex-start;
  align-content: flex-start;
  gap: 0.5rem;
  flex-wrap: nowrap;
  overflow-x: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  max-height: 90vh; // added this line

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
  }
  -webkit-overflow-scrolling: touch;
`;

export const Tracker = styled.button`
  display: flex;
  min-width: 8rem;
  max-width: 31.25rem;
  padding: 1.25rem 0.625rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border-radius: 0.625rem;
  border: none;
  background-color: #F46F5C;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    filter: brightness(90%);
  }
`;

export const TrackerText = styled.span`
  color: #FFF;
  text-align: center;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
`;

export const StatisticsContainer = styled.div`
  display: flex;
  height: 2rem;
  padding: 0.9375rem 1.25rem;
  justify-content: space-between; // changed to space-between to allow gap between the elements
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 0.625rem;
  background: #FFF;
  margin: 0.3125rem 0;
`;

export const StatisticsLabel = styled.span`
  color: #000;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  text-align: left; // Added this line
`;

export const StatisticsData = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  color: #000;
  text-align: right;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
`;

export const FullWidthChartContainer = styled.div`
  width: 100%;
`;

export const FullWidthTableContainer = styled.div`
  width: 100%;
`;

export const StyledTable = styled.table`
  width: 100%;

  th {
    text-align: left !important;
  }

  th:last-child, td:last-child {
    text-align: right !important;
  }
`;