import {
  REQUEST_LOGGED_IN_SUCCESS,
  REQUEST_LOGGED_IN_FAILED,
  SET_LOGOUT,
  SET_LOGIN,
} from "../actions/types";

export const loginReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case REQUEST_LOGGED_IN_SUCCESS:
      return { users: action.payload };
    case REQUEST_LOGGED_IN_FAILED:
      return { error: action.payload };
    case SET_LOGOUT:
      const newUsers = state.users.filter(
        (user) => user._id !== action.payload
      );

      return { users: newUsers };
    case SET_LOGIN:
      const user = state.users.filter((us) => us._id === action.payload._id);
      if (user.length === 0) {
        state.users.push(action.payload);
      }
      return { ...state };
    default:
      return state;
  }
};
