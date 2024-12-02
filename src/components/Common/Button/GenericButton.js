import React from "react";
import { StyledGenericButton } from "./GenericButton.styles";

const GenericButton = ({ label, onClick }) => (
  <StyledGenericButton onClick={onClick}>
    {label}
  </StyledGenericButton>
);

export default GenericButton;
