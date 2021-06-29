import React, { useState } from 'react';
import { Comment, Name, RightSide, StyledAvatar, Wrapper, Time } from './style';
import { Box, Menu, MenuItem, Fade } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ConfirmModal from '../ConfirmModal';
import EditPost from '../EditPost';
import { useSelector, useDispatch } from 'react-redux';
import { updateComment, deleteComment } from '../../redux/actions/postActions';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { getUserId } from '../../redux/actions/userAcions';
import { closeModal } from '../../redux/actions/modalActions';

const CommentItem = ({
  pdp,
  name,
  comment,
  userId,
  postId,
  commentId,
  time,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { currentUserId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [commentaire, setCommentaire] = useState(comment);
  const showProfile = () => {
    dispatch(getUserId(userId));
    dispatch(closeModal());
    history.push('/profile');
  };

  const editComment = (comment) => {
    dispatch(updateComment(postId, commentId, comment));
  };

  const removeComment = () => {
    dispatch(deleteComment(postId, commentId));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    setOpenDelete(true);
  };

  const handleEdit = () => {
    setAnchorEl(null);
    setShowEdit(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <Wrapper>
      <StyledAvatar
        onClick={showProfile}
        src={pdp ? `data:${pdp.contentType};base64, ${pdp.data}` : pdp}
      />
      <RightSide>
        <Box display='flex' justifyContent='space-between'>
          <Name onClick={showProfile}>{name}</Name>
          <Box display='flex' alignItems='center'>
            <Time>{moment(time).fromNow()}</Time>
            {userId.toString() === currentUserId.toString() && (
              <Box>
                <MoreHorizIcon
                  style={{ color: '#ab987a', cursor: 'pointer' }}
                  onClick={handleClick}
                />
                <Menu
                  TransitionComponent={Fade}
                  id='simple-menu'
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}>
                  <MenuItem onClick={handleEdit}>Edit</MenuItem>
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>
              </Box>
            )}
          </Box>
        </Box>
        {showEdit ? (
          <EditPost
            changeText={setCommentaire}
            edit={editComment}
            type='COMMENT'
            text={comment}
            close={() => setShowEdit(false)}
          />
        ) : (
          <Comment>{commentaire}</Comment>
        )}
      </RightSide>
      <ConfirmModal
        open={openDelete}
        handleClose={handleCloseDelete}
        remove={removeComment}
      />
    </Wrapper>
  );
};

export default CommentItem;
