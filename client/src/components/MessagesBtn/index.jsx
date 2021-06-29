import React from 'react';
import { FloatBtn, StyledBadge } from './style';
import { Link } from 'react-router-dom';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
const MessagesBtn = () => {
  return (
    <Link to='/messages'>
      <StyledBadge invisible={true} badgeContent={0} color='error'>
        <FloatBtn size='large'>
          <ChatBubbleIcon style={{ color: '#fff' }} />
        </FloatBtn>
      </StyledBadge>
    </Link>
  );
};

export default MessagesBtn;
