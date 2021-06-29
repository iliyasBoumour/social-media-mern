import React from 'react';
import { Card } from './style';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import SimpleUserItem from '../SimpleUserItem';

const SearchCard = ({ open, anchorEl, close, users }) => {
  return (
    <Popper style={{ zIndex: 1000 }} open={open} anchorEl={anchorEl} transition>
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={close}>
          <Fade {...TransitionProps} timeout={350}>
            <Card>
              {users.map((user) => (
                <SimpleUserItem
                  pdp={user.pdp}
                  name={user.username}
                  key={user._id}
                  userId={user._id}
                  close={close}
                />
              ))}
            </Card>
          </Fade>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

export default SearchCard;
