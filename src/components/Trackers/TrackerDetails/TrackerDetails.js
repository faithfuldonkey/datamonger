import React, { useState } from "react";
import TimeSinceLast from "../../Statistics/Statistics/TimeSinceLast.js";
import TotalCount from "../../Statistics/Statistics/TotalCount.js";
import AverageTimeBetween from "../../Statistics/Statistics/AverageTimeBetween.js";
import Table from "../../Common/Table/Table";
import CustomDatePicker from "../../DatePicker/CustomDatePicker/CustomDatePicker";
import Tracker from "../Tracker/Tracker";
import { getTrackerColor } from "../../../utils/constants";
import { formatDate } from "../../../utils/formatters";
import {
  TrackerDetailsContainer,
  HeaderContainer,
  TrackerListContainer,
  StatisticsContainer,
  EventsTableContainer,
  StyledIcon, // Import StyledIcon
} from "./TrackerDetails.styles";

const TrackerDetails = ({
  groupTitle,
  events,
  trackers = [], // Default value for trackers
  onTrackerClick,
  startDate,
  endDate,
  onDateChange, // New props for date range management
}) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  return (
    <TrackerDetailsContainer>
      <TrackerListContainer>
        {trackers.map((tracker) => (
          <Tracker
            key={tracker}
            title={tracker}
            color={getTrackerColor(tracker, trackers)}
            isSelected={tracker === groupTitle}
            isInDetailsView={!!groupTitle} // Dynamically pass whether details view is active
            onClick={() => onTrackerClick(tracker)}
          />
        ))}
      </TrackerListContainer>

      {groupTitle && (
        <HeaderContainer color={getTrackerColor(groupTitle, trackers)}>
          <div className="header-row">
            <h1>{groupTitle}</h1>
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
            rows={events
              .slice()
              .sort((a, b) => {
                const dateA = new Date(a.start.dateTime || a.start.date);
                const dateB = new Date(b.start.dateTime || b.start.date);
                return dateB - dateA;
              })
              .map((event) => {
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
        </EventsTableContainer>
      )}
    </TrackerDetailsContainer>
  );
};

export default TrackerDetails;
