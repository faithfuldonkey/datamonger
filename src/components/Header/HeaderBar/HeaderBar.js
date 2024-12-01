import React from "react";
import { StyledIcon, StyledHeaderBar, CenterContent } from "./HeaderBar.styles";
import AccountMenu from "../../Auth/AccountMenu/AccountMenu";

const HeaderBar = ({
  onCloseTracker,
  onToggleAccountMenu,
  isAccountMenuVisible,
  isAuthorized,
  onAuthClick,
  handleSignoutClick,
  calendarId,
  calendarList,
  onCalendarChange,
}) => (
  <StyledHeaderBar>
    {/* Back button on the far left */}
    {onCloseTracker ? (
      <StyledIcon className="material-icons" onClick={onCloseTracker}>
        arrow_back
      </StyledIcon>
    ) : (
      <div style={{ width: "24px" }}></div> // Placeholder for spacing
    )}

    {/* Center content (placeholder for title or other items, if needed) */}
    <CenterContent />

    {/* Account button on the far right */}
    <div style={{ position: "relative" }}>
      <StyledIcon className="material-icons" onClick={onToggleAccountMenu}>
        account_circle
      </StyledIcon>

      {/* Conditional rendering for the AccountMenu */}
      {isAccountMenuVisible && (
        <AccountMenu
        isAuthorized={isAuthorized}
        onAuthClick={onAuthClick}
        onSignoutClick={handleSignoutClick} // Rename to match AccountMenu's prop name
        calendarId={calendarId}
        calendarList={calendarList}
        onCalendarChange={onCalendarChange}
      />
      )}
    </div>
  </StyledHeaderBar>
);

export default HeaderBar;
