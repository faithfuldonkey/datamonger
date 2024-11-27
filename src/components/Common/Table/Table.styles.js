import styled from "styled-components";

export const FullWidthTableContainer = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 0.625rem;
  overflow: hidden;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  padding: 1rem 1.25rem 0rem;

  th {
    color: #000;
    font-size: 0.8125rem;
    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: 400;
    text-transform: uppercase;
    opacity: 60%;
    padding-bottom: 0.625rem;
  }

  td {
    color: #000;
    font-family: Inter, sans-serif;
    line-height: 140%;
    padding: 1rem 0;
    border-bottom: 0.03125rem solid rgba(128, 128, 128, 0.25);
  }

  td:first-child {
    font-size: 1rem;
    font-weight: 700;
  }

  td:last-child {
    font-size: 0.8125rem;
    font-weight: 400;
    text-align: right;
  }

  tr:not(:last-child) {
    background: white;
  }

  tr:last-child td {
    border-bottom: none; /* Remove the border from the last row */
  }
`;
