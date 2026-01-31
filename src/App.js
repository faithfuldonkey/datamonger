import React, { useEffect, useState } from "react";
import GlobalStyle from "./styles/GlobalStyles";
import { StyledApp, LoggedOutContainer, MainPage } from "./StyledComponents";
import HeaderBar from "./components/Header/HeaderBar/HeaderBar";
import TrackerDetails from "./components/Trackers/TrackerDetails/TrackerDetails";
import GroupedEvents from "./components/Trackers/GroupedEvents";
import { groupEventsBySummary } from "./utils/groupEvents";
import LoadingSpinner from "./components/Common/LoadingSpinner/LoadingSpinner";
import { StyledButton } from "./components/Auth/AccountMenu/AccountMenu.styles";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  // Authentication from useAuth hook
  const { accessToken, loading: authLoading, login, logout, isAuthenticated } = useAuth();

  // UI states
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isAccountMenuVisible, setIsAccountMenuVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [groupedEvents, setGroupedEvents] = useState({});
  const [calendars, setCalendars] = useState([]);
  const [calendarId, setCalendarId] = useState("c_df81fe5a7834b103d42948781e8fa7a770ad7615ff8ed586e401d8d0c1a9b855@group.calendar.google.com");
  const [startDate, setStartDate] = useState(new Date("1970-01-01T00:00:00Z"));
  const [endDate, setEndDate] = useState(new Date());

  const handleLogin = () => {
    login();
    setIsAccountMenuVisible(false);
  };

  const fetchAllEvents = async (token, calendarId, timeMin, timeMax) => {
  try {
    let allEvents = [];
    let pageToken = null;
    
    do {
      const url = new URL(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`
      );
      url.searchParams.append("timeMin", timeMin);
      url.searchParams.append("timeMax", timeMax);
      url.searchParams.append("singleEvents", "true");
      url.searchParams.append("orderBy", "startTime");
      url.searchParams.append("maxResults", "2500"); // Maximum allowed per page
      
      if (pageToken) {
        url.searchParams.append("pageToken", pageToken);
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Failed to fetch events: ${response.status}`, errorData);
        if (response.status === 401) {
          handleLogout();
        }
        return [];
      }

      const data = await response.json();
      allEvents = [...allEvents, ...(data.items || [])];
      pageToken = data.nextPageToken;
      
      if (allEvents.length >= 20000) {
        console.log("Reached maximum event limit of 20,000");
        break;
      }
    } while (pageToken);

    console.log(`Fetched ${allEvents.length} total events`);
    return allEvents;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

  // Fetch events when token or calendar changes
  useEffect(() => {
    if (accessToken) {
      setEventsLoading(true);
      fetchAllEvents(
        accessToken,
        calendarId,
        new Date("1970-01-01T00:00:00Z").toISOString(), // Always fetch all events
        new Date().toISOString()
      )
        .then((fetchedEvents) => {
          setEvents(fetchedEvents);
        })
        .catch((err) => console.error("Failed to fetch events:", err))
        .finally(() => setEventsLoading(false));
    }
  }, [accessToken, calendarId]); // Remove startDate and endDate from dependencies
  
  // Handle filtering and grouping when events or dates change
  useEffect(() => {
    // Filter events based on date range
    const filteredEvents = events.filter(event => {
      const eventDate = new Date(event.start.dateTime || event.start.date);
      return eventDate >= startDate && eventDate <= endDate;
    });
    
    // Group the filtered events
    const grouped = groupEventsBySummary(filteredEvents);
    setGroupedEvents(grouped);
  }, [events, startDate, endDate]);;

  const handleLogout = () => {
    logout();
    setEvents([]);
    setGroupedEvents({});
    setSelectedGroup(null);
  };

  const handleCalendarChange = (newCalendarId) => {
    setCalendarId(newCalendarId);
  };

  const handleTrackerClick = (trackerName) => {
    setSelectedGroup(trackerName);
  };

  if (authLoading || eventsLoading) {
    return (
      <>
        <GlobalStyle />
        <StyledApp>
          <LoadingSpinner />
        </StyledApp>
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <GlobalStyle />
        <StyledApp>
          <LoggedOutContainer>
            <StyledButton onClick={handleLogin}>Sign in with Google</StyledButton>
          </LoggedOutContainer>
        </StyledApp>
      </>
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
            isAuthorized={isAuthenticated}
            onAuthClick={handleLogin}
            onSignoutClick={handleLogout}
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