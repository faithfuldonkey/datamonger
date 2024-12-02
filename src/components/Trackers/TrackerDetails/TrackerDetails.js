import React, { useState } from "react";
import TimeSinceLast from "../../Statistics/Statistics/TimeSinceLast.js";
import TotalCount from "../../Statistics/Statistics/TotalCount.js";
import AverageTimeBetween from "../../Statistics/Statistics/AverageTimeBetween.js";
import Table from "../../Common/Table/Table";
import CustomDatePicker from "../../DatePicker/CustomDatePicker/CustomDatePicker";
import Tracker from "../Tracker/Tracker";
import GenericButton from "../../Common/Button/GenericButton";
import { getTrackerColor } from "../../../utils/constants";
import DateFilterDescription from "../../Common/DateFilterDescription/DateFilterDescription";
import { formatDate } from "../../../utils/formatters";
import {
  TrackerDetailsContainer,
  HeaderContainer,
  TrackerListContainer,
  StatisticsContainer,
  EventsTableContainer,
  StyledIcon,
} from "./TrackerDetails.styles";

const TrackerDetails = ({
  groupTitle,
  events,
  trackers = [],
  allTrackers = [],
  onTrackerClick,
  startDate,
  endDate,
  onDateChange,
}) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Time");
  const [showAllEvents, setShowAllEvents] = useState(false); 

  
  const sortedAllTrackers = allTrackers.slice().sort();

  const sortedEvents = events
    .slice()
    .sort(
      (a, b) =>
        new Date(b.start.dateTime || b.start.date) -
        new Date(a.start.dateTime || a.start.date)
    );

  const displayedEvents = showAllEvents
    ? sortedEvents
    : sortedEvents.slice(0, 15);

  return (
    <TrackerDetailsContainer>
      <TrackerListContainer>
        {sortedAllTrackers.map((tracker) => (
          <Tracker
            key={tracker}
            title={tracker}
            color={getTrackerColor(tracker, sortedAllTrackers)} 
            isSelected={tracker === groupTitle}
            isInDetailsView={!!groupTitle}
            onClick={() => onTrackerClick(tracker)}
          />
        ))}
      </TrackerListContainer>

      {groupTitle && (
        <HeaderContainer color={getTrackerColor(groupTitle, sortedAllTrackers)}>
          <div className="header-row">
            <h1>{groupTitle}</h1>
            <DateFilterDescription description={selectedFilter} />
            <StyledIcon
              className="material-icons"
              onClick={() => setIsDatePickerVisible(!isDatePickerVisible)}
            >
              date_range
            </StyledIcon>
          </div>
          {isDatePickerVisible && (
            <CustomDatePicker
              startDate={startDate}
              endDate={endDate}
              onDateChange={onDateChange}
              onPresetSelect={(label) => setSelectedFilter(label)}
            />
          )}
          <div className="separator" />
        </HeaderContainer>
      )}

      {groupTitle && (
        <StatisticsContainer>
          <TimeSinceLast events={events} />
          <TotalCount events={events} />
          <AverageTimeBetween events={events} />
        </StatisticsContainer>
      )}

      {groupTitle && (
        <EventsTableContainer>
          <h2>Recent Events</h2>
          <Table
            headers={[
              { label: "Date", align: "left" },
              { label: "Time", align: "right" },
            ]}
            rows={displayedEvents.map((event) => {
              const date = new Date(event.start.dateTime || event.start.date);
              return [
                { content: formatDate(date), align: "left" },
                {
                  content: date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }),
                  align: "right",
                },
              ];
            })}
          />
          {!showAllEvents && sortedEvents.length > 15 && (
            <GenericButton
              label="Show All Events"
              onClick={() => setShowAllEvents(true)}
            />
          )}
        </EventsTableContainer>
      )}
    </TrackerDetailsContainer>
  );
};

export default TrackerDetails;
