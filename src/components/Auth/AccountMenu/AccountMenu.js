import React from "react";
import PropTypes from "prop-types";
import { StyledAccountMenu, StyledButton, StyledSelect } from "./AccountMenu.styles";

const AccountMenu = ({
  isAuthorized,
  onAuthClick,
  onSignoutClick,
  calendarId,
  calendarList,
  onCalendarChange,
}) => (
  <StyledAccountMenu>
    {isAuthorized ? (
      <>
        <StyledButton onClick={onAuthClick}>Connect Calendar</StyledButton>
        <StyledSelect value={calendarId} onChange={(e) => onCalendarChange(e.target.value)}>
          {calendarList.map((calendar) => (
            <option key={calendar.id} value={calendar.id}>
              {calendar.summary}
            </option>
          ))}
        </StyledSelect>
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
  calendarId: PropTypes.string.isRequired,
  calendarList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCalendarChange: PropTypes.func.isRequired,
};

export default AccountMenu;
