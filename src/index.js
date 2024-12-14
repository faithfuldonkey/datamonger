import React from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/AuthContext";
import { EventsProvider } from "./contexts/EventsContext";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <EventsProvider>
        <GoogleOAuthProvider clientId="525173537729-ej8u5pfpkespn2bqq6bh7gite42cn9fk.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </EventsProvider>
    </AuthProvider>
  </React.StrictMode>
);
