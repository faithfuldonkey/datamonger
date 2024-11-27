import React, { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { loadCalendarList, listEvents } from "./services/authService";
import { StyledApp, MainPage } from "./StyledComponents";
import HeaderBar from "./components/Header/HeaderBar/HeaderBar";
import TrackerList from "./components/Trackers/TrackerList/TrackerList";
import CustomDatePicker from "./components/DatePicker/CustomDatePicker/CustomDatePicker";
import DateFilterDescription from "./components/Common/DateFilterDescription/DateFilterDescription";
import StatisticsContainer from "./components/Statistics/StatisticsContainer/StatisticsContainer";
import Button from "./components/Common/Button/Button";
import ChartWrapper from "./components/Charts/ChartWrapper/ChartWrapper";
import Table from "./components/Common/Table/Table";
import AccountMenu from "./components/Auth/AccountMenu/AccountMenu";
import CalendarSelector from "./components/Calendar/CalendarSelector";
import { formatToMMDDYYYY, sortEvents, formatDate } from "./utils/formatters";
import TrackerDetails from "./components/Trackers/TrackerDetails/TrackerDetails";
import GroupedEvents from "./components/Trackers/GroupedEvents";
import { groupEventsBySummary } from "./utils/groupEvents";
import GlobalStyle from "./styles/GlobalStyles";
import { AuthProvider } from './contexts/AuthContext';



const App = () => {
  const { isAuthorized, accessToken, handleAuthClick, handleSignoutClick } =
    useAuth();
  const [calendarId, setCalendarId] = useState(
    localStorage.getItem("calendarId") || ""
  );
  const [calendars, setCalendars] = useState([]);
  const [events, setEvents] = useState([]);
  const [groupedEvents, setGroupedEvents] = useState({});
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(new Date());
  const [isAccountMenuVisible, setIsAccountMenuVisible] = useState(false);
  const [sortNewestFirst, setSortNewestFirst] = useState(true);

  
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

  
  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if ((calendarId && isAuthorized) || savedToken) {
      listEvents(
        savedToken || accessToken,
        calendarId,
        startDate.toISOString(),
        endDate.toISOString()
      ).then((events) => {
        setEvents(events);
        setGroupedEvents(groupEventsBySummary(events));
      });
    }
  }, [calendarId, accessToken, startDate, endDate]);

  const handleCalendarChange = (newCalendarId) => {
    setCalendarId(newCalendarId);
  };

  const handleSignOut = () => {
    handleSignoutClick();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("calendarId");
    setCalendars([]);
    setEvents([]);
    setCalendarId("");
  };

  const sortedEvents = sortEvents(events, sortNewestFirst);

  if (!isAuthorized && !localStorage.getItem("accessToken")) {
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
      <GlobalStyle /> {/* Global styles applied here */}
      <AuthProvider>
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
            onSignoutClick={handleSignOut}
            calendarId={calendarId}
            calendarList={calendars}
            onCalendarChange={handleCalendarChange}
          />
          <DateFilterDescription startDate={startDate} endDate={endDate} />
          {selectedGroup ? (
            <TrackerDetails
              groupTitle={selectedGroup}
              events={groupedEvents[selectedGroup] || []} 
              trackers={Object.keys(groupedEvents)} 
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
      </AuthProvider>
    </>
  );
};

export default App;
