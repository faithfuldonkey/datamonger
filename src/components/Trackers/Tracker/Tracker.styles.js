import styled from "styled-components";

export const StyledTracker = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 150px; /* Set consistent minimum width */
  max-width: 200px; /* Optional for responsive scaling */
  height: 60px; /* Consistent height for all trackers */
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => props.color || "#e0e0e0"};
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease, filter 0.2s ease;

  &:hover {
    filter: brightness(90%);
  }

  &.selected {
    border: 2px solid ${(props) => props.color || "#000"}; /* Highlight selected tracker */
  }
`;



export const TrackerText = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #FFF;
  text-align: center;
`;

export const Tracker = styled.button`
  display: flex;
  min-width: ${({ isSelected }) => (isSelected ? "8rem" : "150px")};
  max-width: ${({ isSelected }) => (isSelected ? "31.25rem" : "calc(33.33% - 1rem)")}; /* Adjust width for wrapping */
  padding: ${({ isSelected }) => (isSelected ? "1rem 0.625rem" : "2rem 4rem")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: ${({ isSelected }) => (isSelected ? "1 0 auto" : "1 1 calc(33.33% - 1rem)")}; /* Equal spacing in wrap mode */
  border-radius: 0.625rem;
  border: none;
  background-color: ${({ color }) => color || "#f46f5c"};
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    filter: brightness(90%);
  }
`;

