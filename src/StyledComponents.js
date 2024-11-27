import styled from "styled-components";

export const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow-x: hidden;
  background-color: #f8f8f8;
`;

export const MainPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  max-width: 1200px; /* Optional: Constrain to a reasonable width */
  margin: 0 auto;
  padding: 16px; /* Add padding to prevent content from touching the edges */
  box-sizing: border-box; /* Include padding in width calculation */

  overflow: hidden; /* Ensure content doesn't overflow */
`;


export const TrackerFrame = styled.div`
  display: flex;
  flex-wrap: ${props => (props.isSelected ? "nowrap" : "wrap")};;
  width: 100%;
  margin: 1rem 0 0 0;
  align-items: flex-start;
  align-content: flex-start;
  gap: ${props => (props.isSelected ? "0.5rem" : "0.8rem")};
  overflow-x: ${props => (props.isSelected ? "scroll" : "hidden")};
  overflow-y: ${props => (props.isSelected ? "hidden" : "scroll")};
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  max-height: 90vh;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
  }
  -webkit-overflow-scrolling: touch;
`;

export const Tracker = styled.button`
  display: flex;
  min-width: ${props => (props.isSelected ? "8rem" : "150px")};
  max-width: ${props => (props.isSelected ? "31.25rem" : "500px")};
  padding: ${props => (props.isSelected ? "1rem 0.625rem" : "2rem 4rem")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border-radius: 0.625rem;
  border: none;
  background-color: ${props => props.color || "#f46f5c"};
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    filter: brightness(90%);
  }
`;

export const TrackerText = styled.span`
  color: #fff;
  text-align: center;
  font-size: 1rem;
  font-family: "Inter", sans-serif;
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
  background: #fff;
  margin: 0.3125rem 0;
`;

export const StatisticsLabel = styled.span`
  color: #000;
  font-size: 1rem;
  font-family: "Inter", sans-serif;
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
  font-family: "Inter", sans-serif;
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
  font-family: "Inter";
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
  background: #e3e3e3;
  color: #000;
  text-align: center;
  font-size: 0.71875rem;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: #d9d9d9;
  }
`;

export const StyledIcon = styled.span`
  cursor: pointer;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justifycontent: space-between;
  alignitems: center;
  width: 100%;
`;

export const DateFilterDescription = styled.span`
  flex: 1;
  text-align: right;
  padding-right: 10px;
  font-family: "Inter";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  opacity: 0.6;
`;

export const Separator = styled.div`
  width: 100%;
  height: 5px;
  background-color: ${props => props.color || "#f46f5c"};
  margin-bottom: 1rem;
`;

export const DatePickerContainer = styled.div`
  margin-bottom: 0.67rem;
  width: 100%;
  > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

export const DatePresetButton = styled.button`
  padding: 0.625rem 1rem;
  border-radius: 0.3125rem;
  background: #e3e3e3;
  color: #000;
  text-align: center;
  font-size: 0.71875rem;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #d9d9d9;
  }
`;

export const DateRangeContainer = styled.div`
  padding-bottom: 0.5rem;
`;

export const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;