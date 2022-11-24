import React, { createContext, useState } from 'react';

export const MainContext = createContext();

export function MainContextProvider({ children }) {
  const [selectedNews, setSelectedNews] = useState(null);

  return (
    <MainContext.Provider
      value={{
        selectedNews,
        setSelectedNews,
      }}>
      {children}
    </MainContext.Provider>
  );
}
