import React from "react";
import { StyledTracker, TrackerText } from "./Tracker.styles";

const Tracker = ({ title, color, isSelected, onClick }) => (
  <StyledTracker
    onClick={onClick}
    color={color}
    isSelected={isSelected}
  >
    <TrackerText>{title}</TrackerText>
  </StyledTracker>
);

export default Tracker;
