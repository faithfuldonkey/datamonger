import React from "react";
import { StyledTrackerFrame } from "./TrackerList.styles";
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
        isInDetailsView={!!selectedTracker} // Pass this dynamically
        onClick={() => onTrackerClick(title)}
      />
    ))}
  </StyledTrackerFrame>
);

export default TrackerFrame;
