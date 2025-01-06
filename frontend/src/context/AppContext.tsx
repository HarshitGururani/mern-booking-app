/* eslint-disable react-refresh/only-export-components */
import React, { useContext } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
interface AppConext {
  isLoggedIn: boolean;
}

const AppConext = React.createContext<AppConext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });
  return (
    <AppConext.Provider
      value={{
        isLoggedIn: !isError,
      }}
    >
      {children}
    </AppConext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppConext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  return context;
};
