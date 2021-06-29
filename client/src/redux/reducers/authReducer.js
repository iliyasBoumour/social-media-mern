import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGING_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  IS_AUTH,
  ADD_DELETE_FOLLOW,
  ADD_DELETE_POST,
} from "../actions/types";
const initialState = {
  token: localStorage.getItem("token"),
  currentUserId: localStorage.getItem("currentUserId"),
  isAuth: localStorage.getItem("isAuth"),
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGING_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("currentUserId", action.payload.user.id);
      localStorage.setItem("isAuth", true);
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("currentUserId");
      localStorage.removeItem("isAuth");
      return {
        ...state,
        token: null,
        currentUserId: null,
        user: null,
        isAuth: false,
        isLoading: false,
      };
    case IS_AUTH:
      return state.isAuth;
    case ADD_DELETE_FOLLOW:
      return {
        ...state,
        user: action.payload,
      };
    case ADD_DELETE_POST:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}
