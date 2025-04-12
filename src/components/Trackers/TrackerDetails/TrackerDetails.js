import React, { useState } from "react";
import TimeSinceLast from "../../Statistics/Statistics/TimeSinceLast.js";
import TotalCount from "../../Statistics/Statistics/TotalCount.js";
import AverageTimeBetween from "../../Statistics/Statistics/AverageTimeBetween.js";
import LongestDailyStreak from "../../Statistics/Statistics/LongestDailyStreak";
import MostIn24Hours from "../../Statistics/Statistics/MostIn24Hours";
import LongestStreakWithout from "../../Statistics/Statistics/LongestStreakWithout";
import Table from "../../Common/Table/Table";
import CustomDatePicker from "../../DatePicker/CustomDatePicker/CustomDatePicker";
import Tracker from "../Tracker/Tracker";
import { DeltaTimeIndicator } from "./TrackerDetails.styles";
import GenericButton from "../../Common/Button/GenericButton";
import { getTrackerColor } from "../../../utils/constants";
import DateFilterDescription from "../../Common/DateFilterDescription/DateFilterDescription";
import { formatDate } from "../../../utils/formatters";
import { formatTimeDifference } from "../../../utils/formatters";
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

  const displayedEventsWithDelta = displayedEvents.map((event, index) => {
    const date = new Date(event.start.dateTime || event.start.date);
    const previousEvent = displayedEvents[index + 1];
    const deltaTime = previousEvent
      ? formatTimeDifference(
          date -
            new Date(previousEvent.start.dateTime || previousEvent.start.date)
        )
      : null;

    return {
      date,
      deltaTime,
    };
  });

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
          <MostIn24Hours events={events} />
          <LongestDailyStreak events={events} />
          <LongestStreakWithout events={events} />
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
            rows={displayedEventsWithDelta.map(({ date, deltaTime }) => {
              return [
                {
                  content: formatDate(date), // Date remains the same
                  align: "left",
                },
                {
                  content: (
                    <>
                      {date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                      {deltaTime && (
                        <DeltaTimeIndicator>+{deltaTime}</DeltaTimeIndicator>
                      )}
                    </>
                  ),
                  align: "right", // Time now contains delta indicator underneath
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
