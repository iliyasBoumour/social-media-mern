import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGING_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  LOGOUT_SUCCESS,
  IS_AUTH,
  ADD_DELETE_FOLLOW,
  ADD_FOLLOW,
  DELETE_FOLLOW,
} from "./types";
import { returnErrors } from "./errorsActions";
import { history } from "../helpers/history";
import axios from "axios";
import { Redirect } from "react-router";
export const loadUser = () => (dispatch, getState) => {
  // loading user
  dispatch({ type: USER_LOADING });

  //config headers
  const configHeader = tokenConfig(getState);

  axios
    .get("/api/users/auth", configHeader)
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      // dispatch(returnErrors(err?.response?.data, err?.response?.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// register User
export const register = (user) => (dispatch) => {
  axios
    .post("/api/users/register", user)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: REGISTER_FAIL });
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

//login
export const login = (user) => (dispatch) => {
  axios
    .post("/api/users/login", user)
    .then((res) => {
      dispatch({
        type: LOGING_SUCCESS,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });

      history.push("/");
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAIL });
      dispatch(returnErrors(err?.response?.data, err?.response?.status));
    });
};

export const logout = () => (dispatch, getState) => {
  //config headers
  const configHeader = tokenConfig(getState);
  //send request to server

  axios
    .get("/api/users/logout", configHeader)
    .then((res) => {
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .catch((err) => {
      dispatch(returnErrors(err?.response?.data, err?.response?.status));
    });
};

export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  //config headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) config.headers["auth-token"] = token;
  return config;
};

export const isAuth = () => (dispatch) => {
  dispatch({ type: IS_AUTH });
};

export const addDeleteFollow = (type) => (dispatch, getState) => {
  switch (type) {
    case ADD_FOLLOW:
      let user = getState().auth.user;
      user.followingCount += 1;
      return dispatch({ type: ADD_DELETE_FOLLOW, payload: user });

    case DELETE_FOLLOW:
      let _user = getState().auth.user;
      _user.followingCount -= 1;
      return dispatch({ type: ADD_DELETE_FOLLOW, payload: _user });
  }
};
