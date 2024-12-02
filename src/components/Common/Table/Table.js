import React from "react";
import { StyledTable, FullWidthTableContainer } from "./Table.styles";

const Table = ({ headers, rows }) => {
  return (
    <FullWidthTableContainer>
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
    </FullWidthTableContainer>
  );
};

export default Table;
