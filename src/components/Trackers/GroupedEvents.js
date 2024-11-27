import React from "react";
import TrackerList from "./TrackerList/TrackerList";

const GroupedEvents = ({ groupedEvents = {}, onGroupClick }) => {
  const titles = Object.keys(groupedEvents); // Extract group titles
  return (
    <TrackerList
      trackers={titles}
      selectedTracker={null} // No tracker is selected initially
      onTrackerClick={onGroupClick} // Pass the onClick handler
    />
  );
};

export default GroupedEvents;
