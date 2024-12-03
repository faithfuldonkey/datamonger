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
  flex-direction: column;
  width: 100%;

  .header-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  h1 {
    margin: 0;
    font-size: 2rem;
    text-align: left;
    flex-grow: 1;
  }

  .separator {
    width: 100%;
    height: 5px;
    margin-top: 8px;
    background-color: ${({ color }) => color || "#ccc"};
  }
`;




export const TrackerListContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
  overflow-x: auto;

 
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
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
  align-self: center;
  margin-left: auto;
`;

export const DeltaTimeIndicator = styled.div`
  font-size: 0.75rem;
  color: #4caf50;
  font-style: italic;
  margin-top: 4px;
  font-weight: 500;
`;
