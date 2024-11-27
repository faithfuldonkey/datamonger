import styled from "styled-components";

export const TrackerDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 16px;
  background-color: #fafafa;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);

  width: 100%;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
`;


export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column; /* Adjusted to stack the h1 and separator */
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;

  h1 {
    margin: 0;
    font-size: 1.5rem;
  }

  .separator {
    width: 100%;
    height: 4px;
    margin-top: 8px;
    background-color: ${({ color }) => color || "#ccc"}; /* Default fallback color */
    border-radius: 2px;
  }
`;


export const TrackerListContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
  overflow-x: auto;
  padding: 8px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;

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
  gap: 1rem;
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
  color: ${({ color }) => color || "#555"};
  align-self: center; /* Align vertically in the header */
  margin-left: auto; /* Push the icon to the far right */
`;