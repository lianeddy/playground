import React from "react";

export const StateContext = React.createContext(null);
export const DispatchContext = React.createContext(null);

export function useAuthState() {
  const context = React.useContext(StateContext);

  return context;
}

export function useAuthDispatch() {
  const context = React.useContext(DispatchContext);

  return context;
}
