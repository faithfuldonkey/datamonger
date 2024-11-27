import React from "react";
import { StyledTrackerFrame } from "./TrackerFrame.styles";
import Tracker from "../Tracker/Tracker";
import { getTrackerColor } from "../../../utils/constants";

const TrackerFrame = ({ trackers, selectedTracker, onTrackerClick }) => (
  <StyledTrackerFrame isSelected={!!selectedTracker}>
    {trackers.map((title) => (
      <Tracker
        key={title}
        title={title}
        color={getTrackerColor(title, trackers)} // Ensure `trackers` is passed
        isSelected={selectedTracker === title}
        onClick={() => onTrackerClick(title)}
      />
    ))}
  </StyledTrackerFrame>
);

export default TrackerFrame;
