import styled from "styled-components";

export const TrackerDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
`;


export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column; /* Keep the separator below the header row */
  width: 100%;

  .header-row {
    display: flex;
    flex-direction: row; /* Align header and icon horizontally */
    justify-content: space-between; /* Space between the text and icon */
    align-items: center; /* Center vertically */
    width: 100%;
  }

  h1 {
    margin: 0;
    font-size: 2rem;
    text-align: left; /* Ensure text stays left-aligned */
    flex-grow: 1; /* Push the icon to the far right */
  }

  .separator {
    width: 100%;
    height: 5px;
    margin-top: 8px;
    background-color: ${({ color }) => color || "#ccc"}; /* Fallback color */
  }
`;




export const TrackerListContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
  overflow-x: auto;

  /* Hide scrollbars visually */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
  }
`;

export const StatisticsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EventsTableContainer = styled.div`
  margin-top: 1rem;

  h2 {
    margin-bottom: 0.5rem;
  }
`;

export const StyledIcon = styled.span`
  cursor: pointer;
  font-size: 1.5rem;
  color: #111;
  align-self: center; /* Align vertically in the header */
  margin-left: auto; /* Push the icon to the far right */
`;