import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Card,
  Header,
  Name,
  StyledAvatar,
  Body,
  Caption,
  ImageContainer,
  Image,
  CardActions,
  Action,
  Number,
  Input,
  InputContainer,
  Time,
} from './style';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCommentIcon from '@material-ui/icons/AddComment';
import SendIcon from '@material-ui/icons/Send';
import { IconButton, Menu, MenuItem, Box, Fade } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ConfirmModal from '../ConfirmModal';
import EditPost from '../EditPost';
import { openModal } from '../../redux/actions/modalActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { closeModal } from '../../redux/actions/modalActions';
import LikesModal from '../LikesModal';
import {
  addComment,
  updatePost,
  deletePost,
  addLike,
  removeLike,
  updateLikesSocket,
  updateCommentsSocket,
} from '../../redux/actions/postActions';
import utils from '../../utils/socket';
import { getUserId } from '../../redux/actions/userAcions';

const Post = ({
  time,
  pdp,
  caption,
  image,
  name,
  children,
  mb,
  nbLikes,
  nbComments,
  userId,
  postId,
  isLiked,
  likes,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [liked, setLiked] = useState(isLiked);
  const dispatch = useDispatch();
  const history = useHistory();
  const [status, setStatus] = useState(caption);
  const { isOpen } = useSelector((state) => state.modal);
  const { loadingAddComment, loadingLike } = useSelector((state) => state.post);
  const [value, setValue] = useState('');
  const { currentUserId } = useSelector((state) => state.auth);
  const [likeModal, setLikeModal] = useState(false);
  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);
  useEffect(() => {
    utils.socket.on('like', (data) => {
      if (
        data.postId?.toString() === postId.toString() &&
        data.userId?.toString() !== currentUserId.toString()
      ) {
        dispatch(updateLikesSocket(data.postId, data.likes));
      }
    });
    utils.socket.on('comment', (data) => {
      if (
        data.postId?.toString() === postId.toString() &&
        data.userId?.toString() !== currentUserId.toString()
      ) {
        dispatch(updateCommentsSocket(data.postId, data.comments));
      }
    });
  }, [currentUserId, dispatch, postId]);

  const removePost = () => {
    dispatch(deletePost(postId));
    dispatch(closeModal());
  };

  const editPost = (caption) => {
    dispatch(updatePost(postId, caption));
  };

  const showProfile = () => {
    dispatch(closeModal());
    dispatch(getUserId(userId));
    history.push(`/profile`);
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

  const showModal = () => {
    if (!isOpen) {
      dispatch(openModal(postId));
    }
  };
  const sendComment = () => {
    if (value.trim()) {
      dispatch(addComment(postId, value));
      setValue('');
    }
  };
  return (
    <>
      <Card mb={mb}>
        <Header>
          <Box display='flex' alignItems='center'>
            <StyledAvatar
              src={pdp ? `data:${pdp.contentType};base64, ${pdp.data}` : pdp}
            />
            <Box>
              <Name onClick={showProfile}>{name}</Name>
              <Time>{moment(time).fromNow()}</Time>
            </Box>
          </Box>
          {userId.toString() === currentUserId.toString() && (
            <Box>
              <MoreVertIcon
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
        </Header>
        <Body>
          {showEdit ? (
            <EditPost
              changeText={setStatus}
              edit={editPost}
              text={caption}
              close={() => setShowEdit(false)}
            />
          ) : (
            <Caption>{status}</Caption>
          )}
          {image ? (
            <ImageContainer>
              {' '}
              <Image
                src={`data:${image.contentType};base64, ${image.data}`}
              />{' '}
            </ImageContainer>
          ) : null}
        </Body>
        <CardActions>
          <Action>
            {liked ? (
              <IconButton
                disabled={loadingLike}
                onClick={() => {
                  dispatch(removeLike(postId));
                  setLiked(!liked);
                }}>
                <FavoriteIcon style={{ color: '#ab987a' }} />
              </IconButton>
            ) : (
              <IconButton
                disabled={loadingLike}
                onClick={() => {
                  dispatch(addLike(postId));
                  setLiked(!liked);
                }}>
                <FavoriteBorderIcon style={{ color: '#ab987a' }} />
              </IconButton>
            )}
            <Number onClick={() => setLikeModal(!likeModal)}>{nbLikes}</Number>
          </Action>
          <Action>
            <IconButton>
              <AddCommentIcon
                style={{ color: '#ab987a' }}
                onClick={showModal}
              />
            </IconButton>
            <Number onClick={showModal}>{nbComments}</Number>
          </Action>
        </CardActions>
        <InputContainer>
          <Input
            value={value}
            type='text'
            placeholder='Add comment...'
            onChange={(e) => setValue(e.target.value)}
          />
          <IconButton disabled={loadingAddComment} onClick={sendComment}>
            <SendIcon style={{ color: '#ab987a' }} />
          </IconButton>
        </InputContainer>
        {children}
      </Card>
      <ConfirmModal
        remove={removePost}
        open={openDelete}
        handleClose={handleCloseDelete}
      />
      <LikesModal
        likes={likes}
        open={likeModal}
        handleClose={() => setLikeModal(!likeModal)}
      />
    </>
  );
};

export default Post;
