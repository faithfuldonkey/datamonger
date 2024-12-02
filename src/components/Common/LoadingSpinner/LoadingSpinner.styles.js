import styled from "styled-components";

export const StyledLoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full page height */
  background-color: #f8f8f8; /* Match your app's background */

  .spinner {
    width: 50px;
    height: 50px;
    border: 6px solid #ddd;
    border-top: 6px solid #007bff; /* Spinner accent color */
    border-radius: 50%;
    animation: spin 500ms linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
