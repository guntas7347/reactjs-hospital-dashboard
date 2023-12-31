import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: {},
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };

    default:
      return state;
  }
};
