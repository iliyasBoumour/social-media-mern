import {
  REQUEST_LOGGED_IN_SUCCESS,
  REQUEST_LOGGED_IN_FAILED,
  SET_LOGOUT,
  SET_LOGIN,
} from "../actions/types";

import utils from "../../utils/socket";
import tokenConfig from "../helpers/tokenConfig";
import axios from "axios";

export const getloggedIn = () => async (dispatch, getState) => {
  try {
    const configHeader = tokenConfig(getState);
    const { data } = await axios.get(`/loggedIn/${utils.user}`, configHeader);
    dispatch({ type: REQUEST_LOGGED_IN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REQUEST_LOGGED_IN_FAILED,
      payload: "error fetching logged in users",
    });
  }
};
export const setLogIn = (id) => async (dispatch, getState) => {
  const configHeader = tokenConfig(getState);
  const { data } = await axios.get(`/api/users/${id}`, configHeader);
  dispatch({ type: SET_LOGIN, payload: data });
};
export const setLogout = (id) => async (dispatch) => {
  dispatch({ type: SET_LOGOUT, payload: id });
};
