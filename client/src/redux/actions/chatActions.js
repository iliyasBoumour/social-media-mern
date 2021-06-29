import {
  GET_ALL_CONVERSATIONS,
  GET_ALL_CONVERSATIONS_SUCCESS,
  GET_ALL_CONVERSATIONS_FAILED,
  GET_ALL_MESSAGES,
  GET_ALL_MESSAGES_SUCCESS,
  GET_ALL_MESSAGES_FAILED,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILED,
  UPDATE_MSGS,
} from "./types";
import axios from "axios";
import utils from "../../utils/socket";
import tokenConfig from "../helpers/tokenConfig";

export const getConversations = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_CONVERSATIONS });
    const configHeader = tokenConfig(getState);
    const { data } = await axios.get(
      `/conversations/${utils?.user}`,
      configHeader
    );
    dispatch({ type: GET_ALL_CONVERSATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_CONVERSATIONS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getMessages = (convId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_MESSAGES });
    const configHeader = tokenConfig(getState);
    const { data } = await axios.get(`/messages/${convId}`, configHeader);
    dispatch({ type: GET_ALL_MESSAGES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_MESSAGES_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const sendMessage =
  (convId, message, _id) => async (dispatch, getState) => {
    try {
      dispatch({ type: SEND_MESSAGE, payload: message });
      utils.socket.emit("message", {
        sender: utils.user,
        receiver: _id,
        text: message,
      });
      const configHeader = tokenConfig(getState);
      await axios.post(
        `/messages`,
        {
          conversationId: convId,
          sender: utils.user,
          text: message,
        },
        configHeader
      );
      dispatch({
        type: SEND_MESSAGE_SUCCESS,
        payload: { text: message, sender: utils.user },
      });
    } catch (error) {
      dispatch({
        type: SEND_MESSAGE_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const updateMsgs = (message) => async (dispatch) => {
  dispatch({ type: UPDATE_MSGS, payload: message });
};
