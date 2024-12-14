import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import GlobalStyle from "./styles/GlobalStyles";
import { StyledApp, MainPage } from "./StyledComponents";
import HeaderBar from "./components/Header/HeaderBar/HeaderBar";
import TrackerDetails from "./components/Trackers/TrackerDetails/TrackerDetails";
import GroupedEvents from "./components/Trackers/GroupedEvents";
import { groupEventsBySummary } from "./utils/groupEvents";

const App = () => {
  // Authentication states
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // UI states
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isAccountMenuVisible, setIsAccountMenuVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [groupedEvents, setGroupedEvents] = useState({});
  const [calendars, setCalendars] = useState([]);
  const [calendarId, setCalendarId] = useState("c_df81fe5a7834b103d42948781e8fa7a770ad7615ff8ed586e401d8d0c1a9b855@group.calendar.google.com");
  const [startDate, setStartDate] = useState(new Date("1970-01-01T00:00:00Z"));
  const [endDate, setEndDate] = useState(new Date());

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Access Token:", tokenResponse.access_token);
      const expiryTime = new Date().getTime() + tokenResponse.expires_in * 1000;
      localStorage.setItem('googleAccessToken', tokenResponse.access_token);
      localStorage.setItem('tokenExpiry', expiryTime.toString());
      setAccessToken(tokenResponse.access_token);
    },
    onError: () => console.error("Login Failed"),
    scope: "https://www.googleapis.com/auth/calendar.readonly",
    persistence: true,
  });

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

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('googleAccessToken');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    
    if (storedToken && tokenExpiry) {
      const isExpired = new Date().getTime() > parseInt(tokenExpiry);
      if (!isExpired) {
        setAccessToken(storedToken);
      } else {
        handleLogout();
      }
    }
    setLoading(false);
  }, []);

  // Fetch events when token or calendar changes
  useEffect(() => {
    if (accessToken) {
      setLoading(true);
      fetchAllEvents(
        accessToken,
        calendarId,
        startDate.toISOString(),
        endDate.toISOString()
      )
        .then((fetchedEvents) => {
          setEvents(fetchedEvents);
          const grouped = groupEventsBySummary(fetchedEvents);
          setGroupedEvents(grouped);
        })
        .catch((err) => console.error("Failed to fetch events:", err))
        .finally(() => setLoading(false));
    }
  }, [accessToken, calendarId, startDate, endDate]);

  const handleLogout = () => {
    localStorage.removeItem('googleAccessToken');
    localStorage.removeItem('tokenExpiry');
    setAccessToken(null);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!accessToken) {
    return (
      <div>
        <h1>Login to Access Calendar</h1>
        <button onClick={() => login()}>Sign in with Google</button>
      </div>
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
            isAuthorized={!!accessToken}
            onAuthClick={login}
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