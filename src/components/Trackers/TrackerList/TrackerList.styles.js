import styled from "styled-components";

export const StyledTrackerFrame = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow wrapping */
  gap: 1rem; /* Consistent spacing */
  justify-content: space-between; /* Spread items evenly across rows */
  width: 100%; /* Ensure the container takes full width */

  /* Scroll behavior for selected state */
  overflow-x: ${({ isSelected }) => (isSelected ? "scroll" : "hidden")};
  overflow-y: ${({ isSelected }) => (isSelected ? "hidden" : "auto")};
  max-height: ${({ isSelected }) => (isSelected ? "90vh" : "none")};

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
  }

  -webkit-overflow-scrolling: touch; /* Smooth scrolling */
`;
