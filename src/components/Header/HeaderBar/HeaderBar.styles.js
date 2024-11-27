import styled from "styled-components";

export const StyledHeaderBar = styled.header`
  display: flex;
  justify-content: space-between; /* Space out the left, center, and right sections */
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;

  width: 100%; /* Ensure it spans the full width of the app */
  box-sizing: border-box; /* Include padding in the width calculation */
`;

export const StyledIcon = styled.span`
  cursor: pointer;
  font-size: 24px;
  color: #333;

  &:hover {
    color: #555;
  }
`;

export const CenterContent = styled.div`
  flex: 1; /* Take up remaining space between the icons */
  display: flex;
  justify-content: center; /* Center any content in this section */
  align-items: center;
`;
