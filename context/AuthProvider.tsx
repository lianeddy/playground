import React, { useReducer } from "react";
import { DispatchContext, StateContext } from "./context";
import { initial_state, reducer } from "./reducer";

const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, initial_state);

  return (
    <StateContext.Provider value={user}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default AuthProvider;
