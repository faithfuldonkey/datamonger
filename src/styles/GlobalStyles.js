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
    background-color: #f8f8f8; /* Matches your app's background */
    color: #333; /* Default text color */
  }

  button, input, textarea {
    font-family: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Inter', sans-serif;
    font-weight: 700; /* Bold headings */
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
