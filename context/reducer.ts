export const initial_state = {
  user: {},
  loading: false,
};

export const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
