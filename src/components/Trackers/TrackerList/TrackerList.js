import React from "react";
import { StyledTrackerFrame } from "./TrackerList.styles";
import Tracker from "../Tracker/Tracker";
import { getTrackerColor } from "../../../utils/constants";

const TrackerFrame = ({ trackers, selectedTracker, onTrackerClick }) => {
  // Sort trackers alphabetically for consistent ordering
  const sortedTrackers = trackers.slice().sort();

  return (
    <StyledTrackerFrame isSelected={!!selectedTracker}>
      {sortedTrackers.map((title) => (
        <Tracker
          key={title}
          title={title}
          color={getTrackerColor(title, sortedTrackers)} // Use sorted trackers
          isSelected={selectedTracker === title}
          isInDetailsView={!!selectedTracker} // Pass this dynamically
          onClick={() => onTrackerClick(title)}
        />
      ))}
    </StyledTrackerFrame>
  );
};

export default TrackerFrame;
