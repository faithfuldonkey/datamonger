import styled from "styled-components";

export const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow-x: hidden;
  background-color: #f8f8f8;
`;

export const LoggedOutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f8f8f8;
  gap: 2rem;
  padding: 2rem;
  text-align: center;

  h1 {
    color: #333;
    font-family: 'Inter', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
  }
`;

export const MainPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
`;