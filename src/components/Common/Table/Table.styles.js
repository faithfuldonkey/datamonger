import styled from "styled-components";

export const StyledTableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 16px 0;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th, td {
    padding: 8px 12px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }
`;
