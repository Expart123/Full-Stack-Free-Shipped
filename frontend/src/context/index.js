import React, { createContext, useContext } from 'react';

const Context = createContext();

export const useAppContext = () => useContext(Context);

export const AppContextProvider = ({ children, value }) => {
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export default Context;
