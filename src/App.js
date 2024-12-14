import React, { useState, useEffect } from "react";
import { loadCalendarList, fetchAllEvents } from "./services/authService";
import { StyledApp, MainPage, LoggedOutContainer } from "./StyledComponents";
import HeaderBar from "./components/Header/HeaderBar/HeaderBar";
import TrackerDetails from "./components/Trackers/TrackerDetails/TrackerDetails";
import GroupedEvents from "./components/Trackers/GroupedEvents";
import { groupEventsBySummary } from "./utils/groupEvents";
import GlobalStyle from "./styles/GlobalStyles";
import { useEvents } from "./contexts/EventsContext";
import LoadingSpinner from "./components/Common/LoadingSpinner/LoadingSpinner";
import { useAuth } from "./contexts/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

const App = () => {
  const { events, setEvents } = useEvents();
  const { user, handleAuthClick, handleSignoutClick } = useAuth();

  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
  const [calendars, setCalendars] = useState([]);
  const [calendarId, setCalendarId] = useState(localStorage.getItem("calendarId") || "");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load calendars when token changes
  useEffect(() => {
    if (token) {
      loadCalendarList(token).then((calendarList) => {
        setCalendars(calendarList);
        if (!calendarId && calendarList.length > 0) {
          setCalendarId(calendarList[0].id);
          localStorage.setItem("calendarId", calendarList[0].id);
        }
      });
    }
  }, [token]);

  // Fetch events when calendar ID changes
  useEffect(() => {
    if (token && calendarId) {
      setLoading(true);
      fetchAllEvents(token, calendarId, "1970-01-01T00:00:00Z", new Date().toISOString())
        .then((fetchedEvents) => {
          setEvents(fetchedEvents);
        })
        .finally(() => setLoading(false));
    }
  }, [token, calendarId, setEvents]);

  // If no user is logged in, display the login screen
  if (!user) {
    return (
      <LoggedOutContainer>
        <GoogleLogin
          onSuccess={(credentialResponse) => handleAuthClick(credentialResponse)}
          onError={() => console.error("Login Failed")}
        />
      </LoggedOutContainer>
    );
  }

  // If data is loading, show a spinner
  if (loading) {
    return (
      <StyledApp>
        <LoadingSpinner />
      </StyledApp>
    );
  }

  const groupedEvents = groupEventsBySummary(events);

  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <MainPage>
          <HeaderBar
            user={user}
            onLogout={handleSignoutClick}
            calendarList={calendars}
            onCalendarChange={(id) => {
              setCalendarId(id);
              localStorage.setItem("calendarId", id);
            }}
          />
          {selectedGroup ? (
            <TrackerDetails
              groupTitle={selectedGroup}
              events={groupedEvents[selectedGroup] || []}
              onBackClick={() => setSelectedGroup(null)}
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
