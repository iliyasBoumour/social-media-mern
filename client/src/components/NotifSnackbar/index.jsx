import React from 'react';
import { SnackbarContent } from 'notistack';
import {
  Action,
  Div,
  Name,
  StyledAvatar,
  FlexDiv,
  Header,
  Title,
  Card,
} from './style';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCommentIcon from '@material-ui/icons/AddComment';
import PersonIcon from '@material-ui/icons/Person';
import { withStyles } from '@material-ui/core/styles';
import { Badge, Box } from '@material-ui/core';

const NotifSnackbar = React.forwardRef((props, ref) => {
  const setInfo = () => {
    switch (props.notification.type) {
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
    <SnackbarContent ref={ref}>
      <Card>
        <Header>
          <Title>New notification</Title>
        </Header>
        <Div>
          <FlexDiv>
            <Badge
              overlap='circle'
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              badgeContent={<SmallIcon />}>
              <StyledAvatar
                src={
                  props.notification.currentUser.pdp
                    ? `data:${props.notification.currentUser.pdp.contentType};base64, ${props.notification.currentUser.pdp.data}`
                    : props.notification.currentUser.pdp
                }
              />
            </Badge>
            <Box>
              <Name>{props.notification.currentUser.username}</Name>
              <Action>{setInfo().action}</Action>
            </Box>
          </FlexDiv>
        </Div>
      </Card>
    </SnackbarContent>
  );
});

export default NotifSnackbar;
