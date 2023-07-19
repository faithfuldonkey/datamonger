import styled from "styled-components";
import Modal from 'react-modal';


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
  background-color: white;
  border-radius: 0.625rem;
  overflow: hidden;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  padding: 1rem 1.25rem 0rem;

  th {
    color: #000;
    font-size: 0.8125rem;
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    text-transform: uppercase;
    opacity: 60%;
    padding-bottom: 0.625rem;
  }

  td {
    color: #000;
    font-family: Inter;
    line-height: 140%;
    padding: 1rem 0;
    border-bottom: 0.03125rem solid rgba(128, 128, 128, 0.25);
  }

  td:first-child {
    font-size: 1rem;
    font-weight: 700;
  }

  td:last-child {
    font-size: 0.8125rem;
    font-weight: 400;
    text-align: right;
  }

  tr:not(:last-child) {
    background: white;
  }

  tr:last-child td {
    border-bottom: none; // remove the border from the last row
  }
`;

export const GenericButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 0.625rem;
  background-color: #e3e3e3;
  color: #111;
  font-family: Inter;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  margin-top: 0.83rem;
  cursor: pointer;
  &:hover {
    background-color: #d9d9d9;
  }
`;

export const SortLabel = styled.div`
  color: #000;
  text-align: right;
  font-size: 1rem;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  margin-right: 0.5rem;
`;

export const SortButton = styled.button`
  display: flex;
  padding: 0.625rem 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  border-radius: 0.3125rem;
  background: #E3E3E3;
  color: #000;
  text-align: center;
  font-size: 0.71875rem;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  cursor: pointer;
  border: none;
`;


export const StyledIcon = styled.span`
  cursor: pointer;
`;

export const StyledModal = styled(Modal)`
  &__content {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;