import React from "react";
import { StyledTracker, TrackerText } from "./Tracker.styles";

const Tracker = ({ title, color, isSelected, isInDetailsView, onClick }) => (
  <StyledTracker
    onClick={onClick}
    color={color}
    isSelected={isSelected}
    isInDetailsView={undefined} // Remove it from DOM attributes
  >
    <TrackerText>{title}</TrackerText>
  </StyledTracker>
);


export default Tracker;
