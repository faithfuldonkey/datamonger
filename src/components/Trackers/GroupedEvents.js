import React from "react";
import TrackerFrame from "./TrackerFrame/TrackerFrame";

const GroupedEvents = ({ groupedEvents = {}, onGroupClick }) => {
  const titles = Object.keys(groupedEvents); // Extract group titles
  return (
    <TrackerFrame
      trackers={titles}
      selectedTracker={null} // No tracker is selected initially
      onTrackerClick={onGroupClick} // Pass the onClick handler
    />
  );
};

export default GroupedEvents;
