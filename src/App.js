import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "./hooks/useAuth";
import { loadCalendarList, listEvents } from "./services/authService";
import { StyledApp, MainPage } from "./StyledComponents";
import HeaderBar from "./components/Header/HeaderBar/HeaderBar";
import DateFilterDescription from "./components/Common/DateFilterDescription/DateFilterDescription";
import Button from "./components/Common/Button/Button";
import TrackerDetails from "./components/Trackers/TrackerDetails/TrackerDetails";
import GroupedEvents from "./components/Trackers/GroupedEvents";
import { groupEventsBySummary } from "./utils/groupEvents";
import GlobalStyle from "./styles/GlobalStyles";
import { useEvents } from "./contexts/EventsContext"; // Import useEvents
import { formatDate } from "./utils/formatters"; // Ensure formatDate is imported
import LoadingSpinner from "./components/Common/LoadingSpinner/LoadingSpinner"; // New Component

const App = () => {
  const { isAuthorized, accessToken, handleAuthClick, handleSignoutClick } =
    useAuth();
  const { events, setEvents } = useEvents(); // Access events and setEvents from context
  console.log("handleSignoutClick from useAuth:", handleSignoutClick);
  const [calendarId, setCalendarId] = useState(
    localStorage.getItem("calendarId") || ""
  );
  const [calendars, setCalendars] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(new Date());
  const [isAccountMenuVisible, setIsAccountMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  const handleTrackerClick = (tracker) => {
    setSelectedGroup(tracker);
  };

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    if (calendarId) {
      localStorage.setItem("calendarId", calendarId);
    }
  }, [calendarId]);

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (isAuthorized || savedToken) {
      loadCalendarList(savedToken || accessToken).then((calendarList) => {
        setCalendars(calendarList);
        if (!calendarId && calendarList.length > 0) {
          setCalendarId(calendarList[0].id);
        }
      });
    }
  }, [isAuthorized, accessToken]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const eventDate = new Date(event.start.dateTime || event.start.date);
      return eventDate >= startDate && eventDate <= endDate;
    });
  }, [events, startDate, endDate]);

  const groupedEvents = useMemo(() => {
    return groupEventsBySummary(filteredEvents);
  }, [filteredEvents]);

  const handleCalendarChange = (newCalendarId) => {
    setCalendarId(newCalendarId);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if ((calendarId && isAuthorized) || savedToken) {
      setLoading(true); // Start loading
      const timeMin = new Date("1970-01-01").toISOString();
      const timeMax = new Date("2100-01-01").toISOString();
      listEvents(savedToken || accessToken, calendarId, timeMin, timeMax).then(
        (fetchedEvents) => {
          setEvents(fetchedEvents);
          setLoading(false); // Stop loading after events load
        }
      );
    }
  }, [calendarId, accessToken, isAuthorized]);

  if (loading) {
    return (
      <StyledApp>
        <LoadingSpinner />
      </StyledApp>
    );
  }

  if (!isAuthorized) {
    return (
      <StyledApp>
        <MainPage>
          <Button label="Connect Calendar" onClick={handleAuthClick} />
        </MainPage>
      </StyledApp>
    );
  }

  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <MainPage>
          <HeaderBar
            onCloseTracker={selectedGroup ? () => setSelectedGroup(null) : null}
            onToggleAccountMenu={() =>
              setIsAccountMenuVisible(!isAccountMenuVisible)
            }
            isAccountMenuVisible={isAccountMenuVisible}
            isAuthorized={isAuthorized}
            onAuthClick={handleAuthClick}
            onSignoutClick={handleSignoutClick}
            calendarId={calendarId}
            calendarList={calendars}
            onCalendarChange={handleCalendarChange}
          />

          {selectedGroup ? (
            <TrackerDetails
              groupTitle={selectedGroup}
              events={groupedEvents[selectedGroup] || []}
              trackers={Object.keys(groupedEvents)}
              allTrackers={Object.keys(groupEventsBySummary(events))}
              onBackClick={() => setSelectedGroup(null)}
              onTrackerClick={handleTrackerClick}
              startDate={startDate}
              endDate={endDate}
              onDateChange={(newStartDate, newEndDate) => {
                setStartDate(newStartDate);
                setEndDate(newEndDate);
              }}
            />
          ) : (
            <GroupedEvents
              groupedEvents={groupedEvents}
              onGroupClick={setSelectedGroup}
            />
          )}
        </MainPage>
      </StyledApp>
    </>
  );
};

export default App;
