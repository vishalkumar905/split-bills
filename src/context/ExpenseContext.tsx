import React, { createContext, useContext, useState, ReactNode } from "react";
import { Expens } from "./types";

interface ExpensContextProps {
  expens: Expens[];
  setExpens: React.Dispatch<React.SetStateAction<Expens[]>>;
}

const ExpensContext = createContext<ExpensContextProps | undefined>(undefined);

export const ExpensProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [expens, setExpens] = useState<Expens[]>([]);

  return (
    <ExpensContext.Provider value={{ expens, setExpens }}>
      {children}
    </ExpensContext.Provider>
  );
};

export const useExpens = () => {
  const context = useContext(ExpensContext);
  if (!context) {
    throw new Error("useExpens must be used within an ExpensProvider");
  }
  return context;
};
