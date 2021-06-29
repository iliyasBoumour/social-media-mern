import React from 'react';
import { Action, Div, Name, StyledAvatar, FlexDiv, Time } from './style';
import { Box, Badge } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCommentIcon from '@material-ui/icons/AddComment';
import PersonIcon from '@material-ui/icons/Person';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/actions/modalActions';
import { getUserId } from '../../redux/actions/userAcions';
import { useHistory } from 'react-router-dom';

const NotifItem = ({ notification, close }) => {
  const { type, createdAt, postId, currentUser } = notification;
  const { userId, pdp, username } = currentUser;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (e) => {
    close(e);
    if (type === 'FOLLOW') {
      dispatch(getUserId(userId));
      history.push('/profile');
    } else if (type === 'LIKE' || type === 'COMMENT') {
      dispatch(openModal(postId));
    }
  };
  const setInfo = () => {
    switch (type) {
      case 'LIKE':
        return { action: 'Liked your post', icon: FavoriteIcon };
      case 'COMMENT':
        return { action: 'Commented your post', icon: AddCommentIcon };
      case 'FOLLOW':
        return { action: 'Followed you', icon: PersonIcon };
      default:
        return;
    }
  };
  const SmallIcon = withStyles((theme) => ({
    root: {
      width: 17,
      height: 17,
      color: '#FFF',
      border: `1px solid ${theme.palette.background.paper}`,
      backgroundColor: '#AB987A',
      borderRadius: 150,
      padding: 2,
    },
  }))(setInfo().icon);
  return (
    <Div onClick={handleClick}>
      <FlexDiv>
        <Badge
          overlap='circle'
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeContent={<SmallIcon />}>
          <StyledAvatar
            src={pdp ? `data:${pdp.contentType};base64, ${pdp.data}` : pdp}
          />
        </Badge>
        <Box>
          <Name>{username}</Name>
          <Action>{setInfo().action}</Action>
        </Box>
      </FlexDiv>
      <Time>{moment(createdAt).fromNow()}</Time>
    </Div>
  );
};

export default NotifItem;
