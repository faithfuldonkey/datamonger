/* global gapi */
import React, { useEffect, useState, useCallback } from "react";
import Chart from "react-apexcharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoginPage from "./LoginPage";
import {
  StyledIcon,
  StyledModal,
  SortButton,
  SortLabel,
  GenericButton,
  StyledTable,
  FullWidthTableContainer,
  FullWidthChartContainer,
  MainPage,
  TrackerFrame,
  Tracker,
  TrackerText,
  StyledApp,
  StatisticsContainer,
  StatisticsData,
  StatisticsLabel,
} from "./StyledComponents";
import "material-icons/iconfont/material-icons.css";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar";

let tokenClient;
let gapiInited = false;
let gisInited = false;

function App() {
  const [events, setEvents] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [calendarId, setCalendarId] = useState("primary");
  const [filter, setFilter] = useState("");
  const [averageTime, setAverageTime] = useState("");
  const [calendarList, setCalendarList] = useState([]);
  const [timeSinceLastEvent, setTimeSinceLastEvent] = useState(null);
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(new Date()); // default to current date
  const [eventCount, setEventCount] = useState(500); // Replace 10 with your desired default event count
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [sortNewestFirst, setSortNewestFirst] = useState(true);
  const [averageTimeMode, setAverageTimeMode] = useState("day-hour");
  const [selectedTracker, setSelectedTracker] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [datePreset, setDatePreset] = useState("Last 30 Days");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isAccountMenuVisible, setIsAccountMenuVisible] = useState(!isAuthorized);


  const handlePreset = useCallback((preset) => {
    setDatePreset(preset);
    let days;

    switch (preset) {
      case "Last 30 Days":
        days = 30;
        break;
      case "Last 90 Days":
        days = 90;
        break;
      case "Last 365 Days":
        days = 365;
        break;
      case "Custom":
        setIsModalVisible(true); // Show date picker
        return;
      case "All Time":
        setStartDate(new Date(0)); // Set date to Unix epoch
        setEndDate(new Date()); // Set date to now
        return;
      default:
        console.error("Invalid preset");
        return;
    }

    const now = new Date();
    const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    setStartDate(pastDate);
    setEndDate(now);
    setIsModalVisible(false); // Hide the modal
  }, []);

  useEffect(() => {
    loadScript("https://apis.google.com/js/api.js", initializeGapiClient);
    loadScript("https://accounts.google.com/gsi/client", initializeGisClient);
  }, []);

  useEffect(() => {
    if (filter) {
      calculateAverageTime(filter);
      calculateTimeSinceLastEvent(filter);
    }
  }, [filter]);

  useEffect(() => {
    listUpcomingEvents();
  }, [startDate, endDate, filter]); // add startDate and endDate to dependency array

  useEffect(() => {
    const savedCalendarId = localStorage.getItem("calendarId");
    if (savedCalendarId) {
      setCalendarId(savedCalendarId);
    }
  }, []);

  useEffect(() => {
    if (isAuthorized && calendarId) {
      listUpcomingEvents();
    }
  }, [isAuthorized, calendarId]);

  useEffect(() => {
    // Hide the account menu if the user is already authorized
    if (isAuthorized) {
      setIsAccountMenuVisible(false);
    }
  }, [isAuthorized]);

  const handleAuthClick = useCallback(() => {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      setIsAuthorized(true);
      await listUpcomingEvents();
      await loadCalendarList();
    };

    if (window.gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      tokenClient.requestAccessToken({ prompt: "" });
    }
  }, []);

  const handleSignoutClick = useCallback(() => {
    const token = window.gapi.client.getToken();
    if (token !== null) {
      window.google.accounts.oauth2.revoke(token.access_token);
      window.gapi.client.setToken("");
      setEvents([]);
      setIsAuthorized(false);
    }
  }, []);

  const handleFilterByTitle = useCallback((title) => {
    setFilter(title);
    setSelectedTracker(title);
    calculateAverageTime(title);
  }, []);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const chartData = events
    .filter((event) =>
      event.summary.toLowerCase().includes(filter.toLowerCase())
    )
    .map((event, index) => {
      const date = new Date(event.start.dateTime || event.start.date);
      return {
        x: date.getTime() + index / 100000, // add the index to the date in milliseconds
        y: date.getHours() + date.getMinutes() / 60, // time of day in hours
        color: index === selectedEvent ? "#ff0000" : "#8884d8", // change color if event is selected
      };
    });

  const chartOptions = {
    chart: {
      type: "heatmap",
      height: 350,
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            { from: -1, to: 0, color: "#00A100" },
            { from: 1, to: 2, color: "#128FD9" },
            { from: 3, to: 4, color: "#FFA500" },
            { from: 5, to: 6, color: "#FF0000" },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      min: 0,
      max: 24,
      tickAmount: 8,
      labels: {
        formatter: (val) => {
          const hour = Math.floor(val);
          const minute = Math.floor((val - hour) * 60);
          return `${hour}:${minute.toString().padStart(2, "0")}`;
        },
      },
    },
    tooltip: {
      x: {
        formatter: (val) => new Date(val).toLocaleString(),
      },
      y: {
        formatter: (val) => {
          const hour = Math.floor(val);
          const minute = Math.floor((val - hour) * 60);
          return `${hour}:${minute.toString().padStart(2, "0")}`;
        },
      },
      z: {
        formatter: (val) => `Event #${val}`,
      },
    },
  };

  function loadScript(url, callback) {
    const script = document.createElement("script");
    script.src = url;
    script.onload = callback;
    document.body.appendChild(script);
  }

  async function initializeGapiClient() {
    await window.gapi.load("client", async () => {
      await window.gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });
      gapiInited = true;
      maybeEnableButtons();
    });
  }

  function initializeGisClient() {
    tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: handleAuthCallback,
    });
    gisInited = true;
    maybeEnableButtons();
  }

  function maybeEnableButtons() {
    if (gapiInited && gisInited) {
      setIsAuthorized(true);
      listUpcomingEvents(); // fetch events after authorization
    }
  }

  function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years >= 1) {
      const remainingMonths = months - years * 12;
      return `${years} ${years > 1 ? "years" : "year"} ${
        remainingMonths > 0
          ? `${remainingMonths} ${remainingMonths > 1 ? "months" : "month"}`
          : ""
      }`;
    }
    if (months >= 1) {
      const remainingDays = days - months * 30;
      return `${months} ${months > 1 ? "months" : "month"} ${
        remainingDays > 0
          ? `${remainingDays} ${remainingDays > 1 ? "days" : "day"}`
          : ""
      }`;
    }
    if (weeks >= 1) {
      const remainingDays = days - weeks * 7;
      return `${weeks} ${weeks > 1 ? "weeks" : "week"} ${
        remainingDays > 0
          ? `${remainingDays} ${remainingDays > 1 ? "days" : "day"}`
          : ""
      }`;
    }
    if (days >= 1) {
      const remainingHours = hours - days * 24;
      return `${days} ${days > 1 ? "days" : "day"} ${
        remainingHours > 0
          ? `${remainingHours} ${remainingHours > 1 ? "hours" : "hour"}`
          : ""
      }`;
    }
    if (hours >= 1) {
      const remainingMinutes = minutes - hours * 60;
      return `${hours} ${hours > 1 ? "hours" : "hour"} ${
        remainingMinutes > 0
          ? `${remainingMinutes} ${remainingMinutes > 1 ? "minutes" : "minute"}`
          : ""
      }`;
    }
    if (minutes >= 1) {
      const remainingSeconds = seconds - minutes * 60;
      return `${minutes} ${minutes > 1 ? "minutes" : "minute"} ${
        remainingSeconds > 0
          ? `${remainingSeconds} ${remainingSeconds > 1 ? "seconds" : "second"}`
          : ""
      }`;
    }
    return `${seconds} ${seconds > 1 ? "seconds" : "second"}`;
  }

  function calculateTimeSinceLastEvent(title) {
    const filteredEvents = events.filter(
      (event) => event.summary.toLowerCase() === title.toLowerCase()
    );
    if (filteredEvents.length === 0) {
      setTimeSinceLastEvent(null);
      return;
    }

    filteredEvents.sort(
      (a, b) =>
        new Date(b.start.dateTime || b.start.date) -
        new Date(a.start.dateTime || a.start.date)
    );
    const mostRecentEvent = filteredEvents[0];
    const currentTime = new Date();
    const eventTime = new Date(
      mostRecentEvent.start.dateTime || mostRecentEvent.start.date
    );
    const timeElapsed = currentTime - eventTime;
    setTimeSinceLastEvent(timeElapsed);
  }

  const filteredEvents = events.filter((event) =>
    event.summary.toLowerCase().includes(filter.toLowerCase())
  );
  const daysInRange = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const completionRate = Math.round(
    (filteredEvents.length / daysInRange) * 100
  );

  const toggleAverageTimeMode = () => {
    setAverageTimeMode((prevMode) =>
      prevMode === "day-hour" ? "hour" : "day-hour"
    );
  };

  const [timeSinceLastEventMode, setTimeSinceLastEventMode] =
    useState("day-hour");
  const toggleTimeSinceLastEventMode = () => {
    setTimeSinceLastEventMode((prevMode) =>
      prevMode === "day-hour" ? "hours" : "day-hour"
    );
  };

  const formatDate = (date) => {
    const now = new Date();
    const eventDate = new Date(date);

    // calculate the difference in days
    const diffInDays = Math.floor((now - eventDate) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays > 1 && diffInDays <= 5) {
      return `${diffInDays} days ago`;
    } else {
      return eventDate.toLocaleDateString("en-EN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  };

  async function handleAuthCallback(resp) {
    if (resp.error !== undefined) {
      throw resp;
    }
    await listUpcomingEvents();
  }

  async function listUpcomingEvents() {
    let response;
    try {
      const request = {
        calendarId: calendarId,
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: eventCount, // <--- Where is this declared?
        orderBy: "startTime",
      };
      response = await window.gapi.client.calendar.events.list(request);
    } catch (err) {
      console.error(err.message);
      return;
    }

    const events = response.result.items;
    if (!events || events.length === 0) {
      console.log("No events found.");
      return;
    }
    setEvents(events);
  }

  async function loadCalendarList() {
    try {
      const response = await gapi.client.calendar.calendarList.list();
      console.log(response.result.items);
      setCalendarList(
        response.result.items.map((item) => ({
          id: item.id,
          summary: item.summary,
        }))
      );
    } catch (err) {
      console.error("Error loading calendar list", err);
    }
  }

  function reloadData() {
    listUpcomingEvents();
  }

  function calculateAverageTime(title) {
    const filteredEvents = events.filter(
      (event) => event.summary.toLowerCase() === title.toLowerCase()
    );
    if (filteredEvents.length < 2) {
      setAverageTime(null);
      return;
    }

    let totalDifference = 0;
    for (let i = 0; i < filteredEvents.length - 1; i++) {
      const date1 = new Date(
        filteredEvents[i].start.dateTime || filteredEvents[i].start.date
      );
      const date2 = new Date(
        filteredEvents[i + 1].start.dateTime || filteredEvents[i + 1].start.date
      );
      const difference = Math.abs(date2 - date1);
      totalDifference += difference;
    }

    const averageDifference = totalDifference / (filteredEvents.length - 1);
    setAverageTime(averageDifference);
  }

  function handleCalendarSelect(id) {
    setCalendarId(id);
    localStorage.setItem("calendarId", id);
  }

  const toggleSortOrder = useCallback(() => {
    setSortNewestFirst((prevSortNewestFirst) => !prevSortNewestFirst);
  }, []);

  const uniqueTitles = [...new Set(events.map((event) => event.summary))];

  if (!isAuthorized) {
    return <LoginPage onLogin={handleAuthClick} />;
  }

  return (
    <StyledApp>
      <MainPage>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <StyledIcon
            className="material-icons"
            onClick={() => setIsAccountMenuVisible(!isAccountMenuVisible)}
          >
            account_circle
          </StyledIcon>
        </div>

        {isAccountMenuVisible && (
          <div>
            {isAuthorized ? (
              <>
                <button onClick={handleAuthClick}>
                  {isAuthorized ? "Connect Calendar" : "Login"}
                </button>
                <select
                  value={calendarId}
                  onChange={(e) => handleCalendarSelect(e.target.value)}
                >
                  {calendarList.map((calendar) => (
                    <option key={calendar.id} value={calendar.id}>
                      {calendar.summary}
                    </option>
                  ))}
                </select>
                <button onClick={handleSignoutClick}>Sign Out</button>
              </>
            ) : (
              <button onClick={handleAuthClick}>
                {isAuthorized ? "Connect Calendar" : "Login"}
              </button>
            )}
          </div>
        )}

        <TrackerFrame>
          {uniqueTitles.map((title) => (
            <Tracker key={title} onClick={() => handleFilterByTitle(title)}>
              <TrackerText>{title}</TrackerText>
            </Tracker>
          ))}
        </TrackerFrame>

        {selectedTracker && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h2>{selectedTracker}</h2>
            <StyledIcon
              className="material-icons"
              onClick={() => setIsDatePickerVisible(!isDatePickerVisible)}
            >
              date_range
            </StyledIcon>
          </div>
        )}

        {isDatePickerVisible && (
          <div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />

            <button onClick={() => handlePreset("Last 30 Days")}>
              Last 30 Days
            </button>
            <button onClick={() => handlePreset("Last 90 Days")}>
              Last 90 Days
            </button>
            <button onClick={() => handlePreset("Last 365 Days")}>
              Last 365 Days
            </button>
            <button onClick={() => handlePreset("All Time")}>All Time</button>
          </div>
        )}

        <StyledModal
          isOpen={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />

          <button onClick={() => handlePreset("Last 30 Days")}>
            Last 30 Days
          </button>
          <button onClick={() => handlePreset("Last 90 Days")}>
            Last 90 Days
          </button>
          <button onClick={() => handlePreset("Last 365 Days")}>
            Last 365 Days
          </button>
          <button onClick={() => handlePreset("Custom")}>Custom</button>
          <button onClick={() => handlePreset("All Time")}>All Time</button>
        </StyledModal>

        <StatisticsContainer>
          <StatisticsLabel>Total Count</StatisticsLabel>
          <StatisticsData>
            {
              events.filter((event) =>
                event.summary.toLowerCase().includes(filter.toLowerCase())
              ).length
            }
          </StatisticsData>
        </StatisticsContainer>

        <StatisticsContainer onClick={toggleAverageTimeMode}>
          <StatisticsLabel>Average Between</StatisticsLabel>
          <StatisticsData>
            {averageTimeMode === "day-hour"
              ? averageTime
                ? `${formatTime(averageTime)}`
                : "N/A"
              : averageTime
              ? `${(averageTime / (1000 * 60 * 60)).toFixed(2)} hours`
              : "N/A"}
          </StatisticsData>
        </StatisticsContainer>

        <StatisticsContainer onClick={toggleTimeSinceLastEventMode}>
          <StatisticsLabel>Time Since Last</StatisticsLabel>
          <StatisticsData>
            {timeSinceLastEventMode === "day-hour"
              ? timeSinceLastEvent
                ? `${formatTime(timeSinceLastEvent)}`
                : "N/A"
              : timeSinceLastEvent
              ? `${(timeSinceLastEvent / (1000 * 60 * 60)).toFixed(2)} hours`
              : "N/A"}
          </StatisticsData>
        </StatisticsContainer>

        <StatisticsContainer>
          <StatisticsLabel>Completion Rate</StatisticsLabel>
          <StatisticsData>{completionRate}%</StatisticsData>
        </StatisticsContainer>

        <GenericButton onClick={() => setIsChartVisible(!isChartVisible)}>
          {isChartVisible ? "Hide Graph" : "Show Graph"}
        </GenericButton>
        {isChartVisible ? (
          <FullWidthChartContainer>
            <Chart
              options={{
                chart: {
                  type: "scatter",
                  zoom: {
                    type: "xy",
                  },
                  toolbar: {
                    show: false,
                  },
                },
                xaxis: {
                  type: "datetime",
                },
                yaxis: {
                  reversed: true,
                  min: 0,
                  max: 24,
                  tickAmount: 8,
                  labels: {
                    formatter: function (val) {
                      return Math.floor(val) + ":00";
                    },
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                grid: {
                  xaxis: {
                    lines: {
                      show: true,
                    },
                  },
                  yaxis: {
                    lines: {
                      show: true,
                    },
                  },
                },
                tooltip: {
                  x: {
                    format: "dd MMM yyyy",
                  },
                  y: {
                    formatter: function (val, opts) {
                      const index = Math.floor(
                        (opts.w.globals.seriesX[opts.seriesIndex][
                          opts.dataPointIndex
                        ] %
                          1) *
                          100000
                      );
                      return `Event #${index + 1}: ${Math.floor(val)}:00`;
                    },
                  },
                },
              }}
              series={[
                {
                  name: "events",
                  data: chartData.map((data) => ({
                    x: data.x,
                    y: data.y,
                    color: data.color,
                  })),
                },
              ]}
              type="scatter"
              height={350}
            />
          </FullWidthChartContainer>
        ) : null}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h2>Recent Events</h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <SortLabel></SortLabel>
            <SortButton onClick={toggleSortOrder}>
              {sortNewestFirst ? "Newest First" : "Oldest First"}
            </SortButton>
          </div>
        </div>

        <FullWidthTableContainer>
          <StyledTable>
            <thead>
              <tr>
                <th align="left">Date</th>
                <th align="right">Time</th>
              </tr>
            </thead>
            <tbody>
              {events
                .filter((event) =>
                  event.summary.toLowerCase().includes(filter.toLowerCase())
                )
                .sort((a, b) => {
                  const dateA = new Date(a.start.dateTime || a.start.date);
                  const dateB = new Date(b.start.dateTime || b.start.date);
                  return sortNewestFirst ? dateB - dateA : dateA - dateB;
                })
                .slice(0, 10)
                .map((event, index) => {
                  const date = new Date(
                    event.start.dateTime || event.start.date
                  );
                  return (
                    <tr key={index}>
                      <td>{formatDate(date)}</td>
                      <td align="right">
                        {date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </StyledTable>
        </FullWidthTableContainer>

        {/* <GenericButton>Show All Events</GenericButton> */}
      </MainPage>
    </StyledApp>
  );
}

export default App;
