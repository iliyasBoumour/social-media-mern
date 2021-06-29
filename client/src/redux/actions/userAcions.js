import { GET_USER_PROFILE, GET_USER_PROFILE_SUCCESS } from './types';

import axios from 'axios';
import { returnErrors } from '../actions/errorsActions';
import tokenConfig from '../helpers/tokenConfig';

export const getUserId = (id) => {
  return {
    type: GET_USER_PROFILE,
    payload: {
      id,
    },
  };
};
export const getUserProfile = (userId) => (dispatch, getState) => {
  // config headers
  const configHeader = tokenConfig(getState);

  axios
    .get(`/api/users/${userId}`, configHeader)
    .then((res) => {
      dispatch({
        type: GET_USER_PROFILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
