import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { EventsProvider } from "./contexts/EventsContext";
import App from "./App";

ReactDOM.render(
  <AuthProvider>
    <EventsProvider>
      <App />
    </EventsProvider>
  </AuthProvider>,
  document.getElementById("root")
);
