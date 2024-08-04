import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import AppProvider from "./contexts/AppProvider.tsx";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css";
import { Notifications } from "@mantine/notifications";
import { HelmetProvider } from "react-helmet-async";
import "@mantine/dates/styles.css";
// import '@mantine/spotlight/styles.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <HelmetProvider>
    <AuthProvider>
      <AppProvider>
        <Notifications position="top-right" autoClose={5000} />
        <App />
      </AppProvider>
    </AuthProvider>
  </HelmetProvider>
  // </React.StrictMode>
);
