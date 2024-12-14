import React from "react";
import PropTypes from "prop-types";
import { StyledAccountMenu, StyledButton } from "./AccountMenu.styles";

const AccountMenu = ({ isAuthorized, onAuthClick, onSignoutClick }) => (
  <StyledAccountMenu>
    {isAuthorized ? (
      <>
        <StyledButton onClick={onSignoutClick}>Sign Out</StyledButton>
      </>
    ) : (
      <StyledButton onClick={onAuthClick}>Login</StyledButton>
    )}
  </StyledAccountMenu>
);

AccountMenu.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  onAuthClick: PropTypes.func.isRequired,
  onSignoutClick: PropTypes.func.isRequired,
};

export default AccountMenu;
