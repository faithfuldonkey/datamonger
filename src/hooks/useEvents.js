// import { createContext, useContext, useState, useEffect } from "react";
// import { listUpcomingEvents } from "../services/api";

// // Create Events Context
// const EventsContext = createContext();

// export const EventsProvider = ({ children }) => {
//   const [allEvents, setAllEvents] = useState([]); // Store all events globally

//   useEffect(() => {
//     const fetchAllEvents = async () => {
//       const startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000); // Last year
//       const endDate = new Date(); // Today
//       const events = await listUpcomingEvents("primary", startDate, endDate, 1000);
//       setAllEvents(events);
//     };

//     fetchAllEvents();
//   }, []);

//   return (
//     <EventsContext.Provider value={{ allEvents, setAllEvents }}>
//       {children}
//     </EventsContext.Provider>
//   );
// };

// export const useEvents = () => useContext(EventsContext);
