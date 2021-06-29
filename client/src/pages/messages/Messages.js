import React, { useState, useEffect } from 'react';
import './messages.css';
import SideBar from '../../components/msgsComponents/Sidebar';
import Conversation from '../../components/msgsComponents/Conversation';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { getConversations, updateMsgs } from '../../redux/actions/chatActions';
import utils from '../../utils/socket';

const Messages = () => {
  // if i click on a connected person
  const location = useLocation();
  const { pers } = location;
  const [person, setPerson] = useState(pers);
  const dispatch = useDispatch();

  const selectConv = (user, convId) => {
    user.convId = convId;
    setPerson(user);
  };
  useEffect(() => {
    dispatch(getConversations());
    utils.socket.on("message", (payload) => {
      orderSidebar();
    });
  }, [dispatch]);
  const orderSidebar = () => {
    dispatch(getConversations());
  };

  return (
    <div className='msg-page'>
      <div className='msg-container '>
        <SideBar onClick={selectConv} />
        {person && <Conversation {...person} orderSidebar={orderSidebar} />}
      </div>
    </div>
  );
};

export default Messages;
