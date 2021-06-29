import {
  GET_ALL_CONVERSATIONS,
  GET_ALL_CONVERSATIONS_SUCCESS,
  GET_ALL_CONVERSATIONS_FAILED,
} from "../actions/types";

export const conversationReducer = (
  state = { conversations: [], loading: true },
  action
) => {
  switch (action.type) {
    case GET_ALL_CONVERSATIONS:
      return { ...state };
    case GET_ALL_CONVERSATIONS_SUCCESS:
      return { conversations: action.payload, loading: false };
    case GET_ALL_CONVERSATIONS_FAILED:
      return { error: action.payload, loading: false };
    default:
      return state;
  }
};
