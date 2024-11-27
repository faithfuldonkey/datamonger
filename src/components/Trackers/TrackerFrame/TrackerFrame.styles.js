import styled from "styled-components";

export const StyledTrackerFrame = styled.div`
  display: flex;
  flex-wrap: ${({ isSelected }) => (isSelected ? "nowrap" : "wrap")}; /* Wrap if no tracker selected */
  width: 100%;
  margin: 1rem 0;
  padding: 16px;
  gap: ${({ isSelected }) => (isSelected ? "0.5rem" : "0.8rem")};
  align-items: ${({ isSelected }) => (isSelected ? "center" : "flex-start")};
  align-content: flex-start; /* Ensure rows align when wrapping */
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 8px;

  /* Scroll behavior based on selected state */
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