import { GET_NOTIFICATION, ADD_NOTIFICATION } from './types';
import tokenConfig from '../helpers/tokenConfig';
import axios from 'axios';
import moment from 'moment';

export const addNotif = (notification) => {
  return {
    type: ADD_NOTIFICATION,
    payload: {
      notification,
    },
  };
};

export const getNotif = () => async (dispatch, getState) => {
  const configHeader = tokenConfig(getState);
  const { data } = await axios.get('/api/notifications/', configHeader);
  const notifications = data.sort((n1, n2) => {
    return moment(n2.createdAt).diff(n1.createdAt);
  });
  dispatch({
    type: GET_NOTIFICATION,
    payload: {
      notifications: data,
    },
  });
};
