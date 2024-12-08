import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "./hooks/useAuth";
import { loadCalendarList, fetchAllEvents } from "./services/authService";
import { StyledApp, MainPage, LoggedOutContainer } from "./StyledComponents";
import HeaderBar from "./components/Header/HeaderBar/HeaderBar";
import Button from "./components/Common/Button/Button";
import TrackerDetails from "./components/Trackers/TrackerDetails/TrackerDetails";
import GroupedEvents from "./components/Trackers/GroupedEvents";
import { groupEventsBySummary } from "./utils/groupEvents";
import GlobalStyle from "./styles/GlobalStyles";
import { useEvents } from "./contexts/EventsContext";
import LoadingSpinner from "./components/Common/LoadingSpinner/LoadingSpinner";

const App = () => {
  const { isAuthorized, accessToken, handleAuthClick, handleSignoutClick } = useAuth();
  const { events, setEvents } = useEvents();
  const [calendarId, setCalendarId] = useState(localStorage.getItem("calendarId") || "");
  const [calendars, setCalendars] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [startDate, setStartDate] = useState(new Date("1970-01-01T00:00:00Z"));
  const [endDate, setEndDate] = useState(new Date());
  const [isAccountMenuVisible, setIsAccountMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isStandalone, setIsStandalone] = useState(false);

  // // Detect standalone mode
  // useEffect(() => {
  //   const isStandaloneMode =
  //     window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  //   setIsStandalone(isStandaloneMode);
  // }, []);

  // Save the access token when it changes
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
  }, [accessToken]);

  // Save the calendar ID when it changes
  useEffect(() => {
    if (calendarId) {
      localStorage.setItem("calendarId", calendarId);
    }
  }, [calendarId]);

  // Load calendars when authorized
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

  useEffect(() => {
    if (isAuthorized) {
      const fetchData = async () => {
        const token = localStorage.getItem("accessToken") || accessToken;
        if (token && calendarId) {
          setLoading(true);
          const events = await fetchAllEvents(token, calendarId, startDate, endDate);
          setEvents(events);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [isAuthorized, calendarId]);
  

  // Fetch events when the calendar changes or user authorizes
  useEffect(() => {
    const fetchData = async () => {
      const savedToken = localStorage.getItem("accessToken");
      if ((calendarId && isAuthorized) || savedToken) {
        setLoading(true);

        const timeMin = new Date("1970-01-01").toISOString();
        const timeMax = new Date("2100-01-01").toISOString();

        const fetchedEvents = await fetchAllEvents(savedToken || accessToken, calendarId, timeMin, timeMax);

        setEvents(fetchedEvents);
        setLoading(false);
      }
    };

    fetchData();
  }, [calendarId, accessToken, isAuthorized]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const eventDate = new Date(event.start.dateTime || event.start.date);
      return eventDate >= startDate && eventDate <= endDate;
    });
  }, [events, startDate, endDate]);

  const groupedEvents = useMemo(() => {
    return groupEventsBySummary(events);
  }, [events]);

  const handleCalendarChange = (newCalendarId) => {
    setCalendarId(newCalendarId);
  };

  const handleTrackerClick = (tracker) => {
    setSelectedGroup(tracker);
  };

  useEffect(() => {
    if (isAuthorized) {
      const fetchData = async () => {
        const token = localStorage.getItem("accessToken") || accessToken;
        if (token && calendarId) {
          setLoading(true);
          const events = await fetchAllEvents(token, calendarId, startDate, endDate);
          setEvents(events);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [isAuthorized, calendarId]);

  if (!isAuthorized) {
    return (
      <LoggedOutContainer>
        <Button label="Connect Calendar" onClick={handleAuthClick} />
      </LoggedOutContainer>
    );
  }
  
  if (loading) {
    return (
      <StyledApp>
        <LoadingSpinner />
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
            onToggleAccountMenu={() => setIsAccountMenuVisible(!isAccountMenuVisible)}
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
            <GroupedEvents groupedEvents={groupedEvents} onGroupClick={setSelectedGroup} />
          )}
        </MainPage>
      </StyledApp>
    </>
  );
};

export default App;
