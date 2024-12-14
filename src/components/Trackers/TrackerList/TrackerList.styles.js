import styled from "styled-components";

export const StyledTrackerFrame = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  width: 100%;

  overflow-x: ${({ isSelected }) => (isSelected ? "scroll" : "hidden")};
  overflow-y: ${({ isSelected }) => (isSelected ? "hidden" : "auto")};
  max-height: ${({ isSelected }) => (isSelected ? "90vh" : "none")};

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  -webkit-overflow-scrolling: touch;
`;
