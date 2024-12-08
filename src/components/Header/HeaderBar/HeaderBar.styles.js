import styled from "styled-components";

export const StyledHeaderBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  padding-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;
`;


export const StyledIcon = styled.span`
  cursor: pointer;
  font-size: 24px;
  color: #111;

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
