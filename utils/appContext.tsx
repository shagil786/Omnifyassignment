"use client";
import { AppData, DeveloperDataContextProps } from "@/types/types";
import { createContext, useContext, useState, ReactNode } from "react";

const DeveloperDataContext = createContext<DeveloperDataContextProps>({
  appData: {
    collapse: false,
  },
  setAppData: () => {},
});

export const DeveloperDataProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [appData, setAppData] = useState<AppData>();

  return (
    <DeveloperDataContext.Provider value={{ appData, setAppData }}>
      {children}
    </DeveloperDataContext.Provider>
  );
};

export const useDeveloperData = () => {
  const context = useContext(DeveloperDataContext);
  if(context === undefined) throw new Error("useDeveloperData must be used within a DeveloperDataProvider");

  return context;
};
