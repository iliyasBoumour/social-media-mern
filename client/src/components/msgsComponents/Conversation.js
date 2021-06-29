import React, { useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import ScrollableFeed from "react-scrollable-feed";
import Msg from "./Msg";
import SendIcon from "@material-ui/icons/Send";
import { useState } from "react";
import utils from "../../utils/socket";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessages,
  sendMessage,
  updateMsgs,
} from "../../redux/actions/chatActions";
import Loading from "../Spinner/Loading";

const Conversation = ({ _id, username, pdp, status, convId, orderSidebar }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector(
    (state) => state.messagesReducer
  );
  const sendNewMessage = () => {
    if (message) {
      console.log("sendNewMessage");
      dispatch(sendMessage(convId, message, _id));
      orderSidebar();
      setMessage("");
    }
  };

  // getMessages
  useEffect(() => {
    dispatch(getMessages(convId));
  }, [dispatch, convId]);

  const msgReceived = (payload) => {
    if (_id === payload.message.sender) {
      dispatch(updateMsgs(payload.message));
      payload.message.sender = null;
    }
  };

  useEffect(() => {
    utils.socket.on("message", (payload) => {
      console.log("msg received");
      msgReceived(payload);
      // orderSidebar();
    });
  }, []);

  return (
    <div className="conversation">
      <div className="conversation-header ">
        <div className="user">
          <Avatar
            src={pdp ? `data:${pdp.contentType};base64, ${pdp.data}` : pdp}
          />
          <h6>{username}</h6>
        </div>
        <p>{status === true ? "Online" : "Offline"}</p>
      </div>
      <ScrollableFeed className="conversation-msgs">
        {loading ? (
          <Loading />
        ) : (
          messages?.map((mg, i) => (
            <Msg
              key={mg._id || i}
              image={pdp}
              msg={mg.text}
              sended={mg.sender === utils.user}
            />
          ))
        )}
      </ScrollableFeed>
      <div className="conversation-send">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          rows="1"
          placeholder="write your message"
        />
        <IconButton onClick={sendNewMessage}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Conversation;
