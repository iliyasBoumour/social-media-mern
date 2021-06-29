import { ADD_NOTIFICATION, GET_NOTIFICATION } from '../actions/types';

const notificationReducer = (
  state = { count: 0, notifications: [] },
  action,
) => {
  switch (action.type) {
    case GET_NOTIFICATION:
      return {
        ...state,
        count: 0,
        notifications: action.payload.notifications,
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        count: state.count + 1,
        notifications: [action.payload.notification, ...state.notifications],
      };
    default:
      return state;
  }
};

export default notificationReducer;
