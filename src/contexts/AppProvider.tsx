/* eslint-disable react-refresh/only-export-components */
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React, { useContext } from "react";

const AppContext = React.createContext({
});

export const useApp = () => useContext(AppContext);

const AppProvider = ({ children }: { children: React.ReactNode }) => {

  return (
    <MantineProvider
      theme={{
        colors: {
          brand: [
            "#F0BBDD",
            "#ED9BCF",
            "#EC7CC3",
            "#ED5DB8",
            "#F13EAF",
            "#F71FA7",
            "#605BFF",
            "#14106d",
            "#C50E82",
            "#AD1374",
          ],
        },
        primaryColor: "brand",
      }}
    >
      <Notifications position="top-right" />
      <AppContext.Provider
        value={
          {}
        }
      >
        {children}
      </AppContext.Provider>
    </MantineProvider>
  );
};

export default AppProvider;
