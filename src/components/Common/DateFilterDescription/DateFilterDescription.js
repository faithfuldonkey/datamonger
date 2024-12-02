import React from "react";
import { StyledDateFilterDescription } from "./DateFilterDescription.styles";

const DateFilterDescription = ({ description }) => {
  console.log("DateFilterDescription received:", description); // Debug log
  return (
    <StyledDateFilterDescription>{description}</StyledDateFilterDescription>
  );
};

export default DateFilterDescription;
