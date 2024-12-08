import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    background-color: #f8f8f8;
    color: #333;
  }

  button, input, textarea {
    font-family: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  /* Adjust padding for iOS standalone mode */
  @media (display-mode: standalone) {
    body {
      padding-top: calc(env(safe-area-inset-top) - 1rem);
    }
  }
`;

export default GlobalStyle;
