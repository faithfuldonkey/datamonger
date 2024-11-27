import React from "react";
import { StyledButton } from "./Button.styles";

const Button = ({ label, onClick }) => (
  <StyledButton onClick={onClick}>{label}</StyledButton>
);

export default Button;
