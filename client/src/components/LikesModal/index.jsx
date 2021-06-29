import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useStyles, Card, Header, Title } from '../ConfirmModal/style';
import { Body } from './style';
import SimpleUserItem from '../SimpleUserItem';

const LikesModal = ({ open, handleClose, likes }) => {
  const classes = useStyles();
  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Card>
            <Header>
              <Title>Likes</Title>
            </Header>
            <Body>
              {likes.map((like) => (
                <SimpleUserItem
                  display
                  key={like.userId}
                  name={like.username}
                  pdp={like.pdp}
                  userId={like.userId}
                  closeLikesModal={handleClose}
                />
              ))}
            </Body>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
};

export default LikesModal;
