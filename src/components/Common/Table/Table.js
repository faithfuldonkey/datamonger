import React from "react";
import { StyledTableContainer, StyledTable } from "./Table.styles";

const Table = ({ headers, rows }) => (
  <StyledTableContainer>
    <StyledTable>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} align={header.align || "left"}>
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} align={cell.align || "left"}>
                {cell.content}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  </StyledTableContainer>
);

export default Table;
