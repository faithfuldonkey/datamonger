/* global gapi */
import React, { useEffect, useState, useCallback } from 'react';
import Chart from 'react-apexcharts';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar';

let tokenClient;
let gapiInited = false;
let gisInited = false;

function App() {
  const [events, setEvents] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [calendarId, setCalendarId] = useState('primary');
  const [eventCount, setEventCount] = useState(500);
  const [filter, setFilter] = useState('');
  const [averageTime, setAverageTime] = useState('');
  const [calendarList, setCalendarList] = useState([]);
  const [timeSinceLastEvent, setTimeSinceLastEvent] = useState(null);
  const [startDate, setStartDate] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
  const [endDate, setEndDate] = useState(new Date()); // default to current date



  useEffect(() => {
    loadScript('https://apis.google.com/js/api.js', initializeGapiClient);
    loadScript('https://accounts.google.com/gsi/client', initializeGisClient);
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
    const savedCalendarId = localStorage.getItem('calendarId');
    if (savedCalendarId) {
      setCalendarId(savedCalendarId);
    }
  }, []);

  const handleAuthClick = useCallback(() => {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      setIsAuthorized(true);
      await listUpcomingEvents();
      await loadCalendarList();
    };
  
    if (window.gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
      tokenClient.requestAccessToken({prompt: ''});
    }
  }, []);

  const handleSignoutClick = useCallback(() => {
    const token = window.gapi.client.getToken();
    if (token !== null) {
      window.google.accounts.oauth2.revoke(token.access_token);
      window.gapi.client.setToken('');
      setEvents([]);
      setIsAuthorized(false);
    }
  }, []);

  const handleFilterByTitle = useCallback((title) => {
    setFilter(title);
    calculateAverageTime(title);
  }, []);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const chartData = events
  .filter(event => event.summary.toLowerCase().includes(filter.toLowerCase()))
  .map((event, index) => {
    const date = new Date(event.start.dateTime || event.start.date);
    return {
      x: date.getTime() + index / 100000, // add the index to the date in milliseconds
      y: date.getHours() + date.getMinutes() / 60, // time of day in hours
      color: index === selectedEvent ? '#ff0000' : '#8884d8', // change color if event is selected
    };
  });


  const chartOptions = {
    chart: {
      type: 'heatmap',
      height: 350,
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            { from: -1, to: 0, color: '#00A100' },
            { from: 1, to: 2, color: '#128FD9' },
            { from: 3, to: 4, color: '#FFA500' },
            { from: 5, to: 6, color: '#FF0000' },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      min: 0,
      max: 24,
      tickAmount: 8,
      labels: {
        formatter: (val) => {
          const hour = Math.floor(val);
          const minute = Math.floor((val - hour) * 60);
          return `${hour}:${minute.toString().padStart(2, '0')}`;
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
          return `${hour}:${minute.toString().padStart(2, '0')}`;
        },
      },
      z: {
        formatter: (val) => `Event #${val}`,
      },
    },
  };

  


  function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    document.body.appendChild(script);
  }

  async function initializeGapiClient() {
    await window.gapi.load('client', async () => {
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
    }
  }

  function formatTime(milliseconds) {
    const seconds = milliseconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;
    const months = days / 30;
    const years = days / 365;
  
    if (years >= 1) return `${years.toFixed(2)} years`;
    if (months >= 1) return `${months.toFixed(2)} months`;
    if (weeks >= 1) return `${weeks.toFixed(2)} weeks`;
    if (days >= 1) return `${days.toFixed(2)} days`;
    if (hours >= 1) return `${hours.toFixed(2)} hours`;
    if (minutes >= 1) return `${minutes.toFixed(2)} minutes`;
    return `${seconds.toFixed(2)} seconds`;
  }

  function calculateTimeSinceLastEvent(title) {
    const filteredEvents = events.filter(event => event.summary.toLowerCase() === title.toLowerCase());  
    if (filteredEvents.length === 0) {
      setTimeSinceLastEvent(null);
      return;
    }
  
    filteredEvents.sort((a, b) => new Date(b.start.dateTime || b.start.date) - new Date(a.start.dateTime || a.start.date));
    const mostRecentEvent = filteredEvents[0];
    const currentTime = new Date();
    const eventTime = new Date(mostRecentEvent.start.dateTime || mostRecentEvent.start.date);
    const timeElapsed = currentTime - eventTime;
    setTimeSinceLastEvent(timeElapsed);
  }

  const filteredEvents = events.filter(event => event.summary.toLowerCase().includes(filter.toLowerCase()));
  const daysInRange = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const completionRate = Math.round((filteredEvents.length / daysInRange) * 100);
  

  async function handleAuthCallback(resp) {
    if (resp.error !== undefined) {
      throw (resp);
    }
    await listUpcomingEvents();
  }

  async function listUpcomingEvents() {
    let response;
    try {
      const request = {
        'calendarId': calendarId,
        'timeMin': startDate.toISOString(),
        'timeMax': endDate.toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': eventCount,
        'orderBy': 'startTime',
      };
      response = await window.gapi.client.calendar.events.list(request);
    } catch (err) {
      console.error(err.message);
      return;
    }
  
    const events = response.result.items;
    if (!events || events.length === 0) {
      console.log('No events found.');
      return;
    }
    setEvents(events);
  }  

  async function loadCalendarList() {
    try {
      const response = await gapi.client.calendar.calendarList.list();
      console.log(response.result.items);
      setCalendarList(response.result.items.map(item => ({id: item.id, summary: item.summary})));
    } catch (err) {
      console.error('Error loading calendar list', err);
    }
  }

  function reloadData() {
    listUpcomingEvents();
  }

  function loadCalendar() {
    listUpcomingEvents();
  }

  function calculateAverageTime(title) {
    const filteredEvents = events.filter(event => event.summary.toLowerCase() === title.toLowerCase());
    if (filteredEvents.length < 2) {
      setAverageTime(null);
      return;
    }
  
    let totalDifference = 0;
    for (let i = 0; i < filteredEvents.length - 1; i++) {
      const date1 = new Date(filteredEvents[i].start.dateTime || filteredEvents[i].start.date);
      const date2 = new Date(filteredEvents[i + 1].start.dateTime || filteredEvents[i + 1].start.date);
      const difference = Math.abs(date2 - date1);
      totalDifference += difference;
    }
  
    const averageDifference = totalDifference / (filteredEvents.length - 1);
    setAverageTime(averageDifference);
  }

  function handleCalendarSelect(id) {
    setCalendarId(id);
    localStorage.setItem('calendarId', id);
  }
  

  const uniqueTitles = [...new Set(events.map(event => event.summary))];

  return (
    <div>
      <h1>Your Data</h1>
      {isAuthorized ? (
        <div>
          <button onClick={handleAuthClick}>{isAuthorized ? 'Connect Calendar' : 'Login'}</button>
          <button onClick={handleSignoutClick}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleAuthClick}>{isAuthorized ? 'Connect Calendar' : 'Login'}</button>
      )}
      <br/>
      <select
        value={calendarId}
        onChange={e => handleCalendarSelect(e.target.value)}
      >
        {calendarList.map((calendar) => (
          <option key={calendar.id} value={calendar.id}>{calendar.summary}</option>
        ))}
      </select>
      <button onClick={loadCalendar}>Set Calendar</button>
      
      <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      <DatePicker selected={endDate} onChange={date => setEndDate(date)} />

      <h2>Your Recurring Events</h2>
      {uniqueTitles.map((title) => (
        <button key={title} onClick={() => handleFilterByTitle(title)}>{title}</button>
      ))}
      <div>
        <h2>Statistics</h2>
        <p>Number of events logged: {events.filter(event => event.summary.toLowerCase().includes(filter.toLowerCase())).length}</p>
        <p>Average time between events: {averageTime ? `${formatTime(averageTime)} (${(averageTime / (1000 * 60 * 60)).toFixed(2)} hours)` : 'N/A'}</p>
        <p>Time since last event: {timeSinceLastEvent ? formatTime(timeSinceLastEvent) : 'N/A'}</p>
        <p>Completion Rate: {completionRate}%</p>
      </div>

      <Chart
        options={{
          chart: {
            type: 'scatter',
            zoom: {
              type: 'xy'
            }
          },
          xaxis: {
            type: 'datetime'
          },
          yaxis: {
            reversed: true,
            min: 0,
            max: 24,
            tickAmount: 8,
            labels: {
              formatter: function(val) {
                return Math.floor(val) + ':00';
              }
            }
          },
          dataLabels: {
            enabled: false
          },
          grid: {
            xaxis: {
              lines: {
                show: true
              }
            },
            yaxis: {
              lines: {
                show: true
              }
            },
          },
          tooltip: {
            x: {
              format: 'dd MMM yyyy'
            },
            y: {
              formatter: function(val, opts) {
                const index = Math.floor((opts.w.globals.seriesX[opts.seriesIndex][opts.dataPointIndex] % 1) * 100000);
                return `Event #${index + 1}: ${Math.floor(val)}:00`;
              }
            }
          }
        }}
        series={[{
          name: 'events',
          data: chartData.map(data => ({x: data.x, y: data.y, color: data.color}))
        }]}
        type="scatter"
        height={350}
      />



  <h2>List of Events</h2>

  <table>
    <thead>
      <tr>
        <th>Event #</th>
        <th>Event Title</th>
        <th>Date</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      {events
        .filter(event => event.summary.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => new Date(b.start.dateTime || b.start.date) - new Date(a.start.dateTime || a.start.date))
        .map((event, index) => {
          const date = new Date(event.start.dateTime || event.start.date);
          return (
            <tr key={index} onClick={() => setSelectedEvent(index)}>
              <td>{index + 1}</td>
              <td>{event.summary}</td>
              <td>{date.toLocaleDateString()}</td>
              <td>{date.toLocaleTimeString()}</td>
            </tr>
          );
        })}
    </tbody>
  </table>
  </div>
  );

}

export default App;