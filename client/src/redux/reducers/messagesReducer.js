import {
  GET_ALL_MESSAGES,
  GET_ALL_MESSAGES_SUCCESS,
  GET_ALL_MESSAGES_FAILED,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILED,
  UPDATE_MSGS,
} from "../actions/types";

const messagesReducer = (
  state = { messages: [], message: "", sended: false, loading: true },
  action
) => {
  switch (action.type) {
    case GET_ALL_MESSAGES:
      return { ...state, messages: [], loading: true };
    case GET_ALL_MESSAGES_SUCCESS:
      return { ...state, messages: action.payload, loading: false };
    case GET_ALL_MESSAGES_FAILED:
      return { ...state, error: action.payload, loading: false };
    case SEND_MESSAGE:
      return { ...state, message: action.payload, sended: false };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        sended: true,
      };
    case SEND_MESSAGE_FAILED:
    case UPDATE_MSGS:
      return { ...state, messages: [...state.messages, action.payload] };

    default:
      return state;
  }
};
export default messagesReducer;
