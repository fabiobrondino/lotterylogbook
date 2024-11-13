/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NextGameProviderProps {
  children: ReactNode;
}

interface NextGameContextType {
  nextGameData: any;
  setNextGameData: React.Dispatch<React.SetStateAction<any>>;
}

const NextGameContext = createContext<NextGameContextType | undefined>(
  undefined
);

export function NextGameProvider({ children }: NextGameProviderProps) {
  const [nextGameData, setNextGameData] = useState(null);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <NextGameContext.Provider value={{ nextGameData, setNextGameData }}>
      {children}
    </NextGameContext.Provider>
  );
}

export function useNextGame() {
  return useContext(NextGameContext);
}
