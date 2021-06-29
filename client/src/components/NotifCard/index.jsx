import React from 'react';
import { Card, Header, Title } from './style';
import NotifItem from '../NotifItem';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useSelector } from 'react-redux';

const NotifCard = ({ open, anchorEl, close }) => {
  const { notifications } = useSelector((state) => state.notification);
  return (
    <Popper style={{ zIndex: 1000 }} open={open} anchorEl={anchorEl} transition>
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={close}>
          <Fade {...TransitionProps} timeout={350}>
            <Card>
              <Header>
                <Title>Notifications</Title>
              </Header>
              {notifications.map((notif) => (
                <NotifItem notification={notif} key={notif._id} close={close} />
              ))}
            </Card>
          </Fade>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

export default NotifCard;
