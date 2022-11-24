import React, { createContext, useState } from 'react';

export const MainContext = createContext();

export function MainContextProvider({ children }) {
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  return (
    <MainContext.Provider
      value={{
        selectedSurvey,
        setSelectedSurvey,
      }}>
      {children}
    </MainContext.Provider>
  );
}
