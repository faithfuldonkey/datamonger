import styled from "styled-components";

export const StyledTracker = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: bold;
  text-align: center;
  flex: 1 0 0px;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.625rem;
  border: none;
  background-color: ${(props) => props.color || "#e0e0e0"};
  transition: background-color 0.3s;
  cursor: pointer;

  padding: ${({ isInDetailsView }) =>
    isInDetailsView ? "0.5rem 0.25rem" : "1rem 0.625rem"};
  min-width: ${({ isInDetailsView }) => (isInDetailsView ? "8rem" : "150px")};
  max-width: ${({ isInDetailsView }) => (isInDetailsView ? "31.25rem" : "500px")};  height: ${({ isInDetailsView }) => (isInDetailsView ? "3rem" : "80px")};

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
  color: #fff;
  text-align: center;
`;
