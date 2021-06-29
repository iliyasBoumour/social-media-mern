import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import HeaderProfile from '../../components/HeaderProfile';
import Post from '../../components/Post';
import Photos from '../../components/Photos';
import EditIcon from '@material-ui/icons/Edit';
import Friends from '../../components/Friends';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonPost from '../../components/SkeletonPost';
import { loadProfilePosts } from '../../redux/actions/postActions';
import EditProfileModal from '../../components/EditProfileModal';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {
  PrimarydButton,
  ButtonWrapper,
  OutlinedButton,
  EmptyStateContainer,
  EmptyStateTitle,
} from './style';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { getUserProfile } from '../../redux/actions/userAcions';
import PhotoIcon from '@material-ui/icons/Photo';

const useStyles = makeStyles((theme) => ({
  sticky: {
    position: 'sticky',
    height: 'fit-content',
    top: '70px',
    [theme.breakpoints.down('md')]: {
      position: 'static',
    },
  },
  last: {
    width: '100%',
    [theme.breakpoints.down('md')]: {
      order: 3,
    },
  },
}));

const Profile = ({}) => {
  const classes = useStyles();
  const history = useHistory();
  const { posts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { userId, followers, following, isFollow, username, pdp } = useSelector(
    (state) => state.userProfile,
  );
  const [followed, setFollowed] = useState(isFollow);
  const { currentUserId, token } = useSelector((state) => state.auth);
  const [disable, setDisable] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setFollowed(isFollow);
    dispatch(getUserProfile(userId));
    dispatch(loadProfilePosts(userId));
  }, [userId, isFollow, dispatch]);

  const follow = async () => {
    //config headers
    setFollowed(!followed);
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    if (token) config.headers['auth-token'] = token;

    try {
      setDisable(true);
      await axios.post('/api/users/following', { id: userId }, config);
      setDisable(false);
    } catch (error) {
      alert(error.response.data);
    }
  };
  const unfollow = async () => {
    //config headers
    setFollowed(!followed);
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    if (token) config.headers['auth-token'] = token;

    try {
      setDisable(true);
      await axios.delete(`/api/users/following/${userId}`, config);
      setDisable(false);
    } catch (error) {}
  };

  const showMessage = async() => {
    const pers = { _id:userId, pdp, username };
    const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      if (token) config.headers["auth-token"] = token;
    const {data}=await axios.get(`/conversations/${currentUserId}/${userId}`,config)
    pers.convId = data._id;
    data &&
      history.push({
        pathname: '/Messages',
        pers,
      });
  };

  return (
    <Container maxWidth='lg'>
      <HeaderProfile />
      <Grid container spacing={3}>
        <Grid item md={6} xs={12} lg={3} className={classes.sticky}>
          {currentUserId.toString() === userId?.toString() ? (
            <PrimarydButton
              startIcon={<EditIcon />}
              onClick={() => setOpen(!open)}>
              Edit Profile
            </PrimarydButton>
          ) : (
            <ButtonWrapper>
              {followed ? (
                <OutlinedButton
                  disabled={disable}
                  onClick={unfollow}
                  startIcon={<PersonAddDisabledIcon />}>
                  Unfollow
                </OutlinedButton>
              ) : (
                <OutlinedButton
                  disabled={disable}
                  onClick={follow}
                  startIcon={<PersonAddIcon />}>
                  Follow
                </OutlinedButton>
              )}
              <PrimarydButton
                onClick={showMessage}
                startIcon={<ChatBubbleIcon />}>
                Message
              </PrimarydButton>
            </ButtonWrapper>
          )}
          <Photos />
        </Grid>
        <Grid item md={12} lg={6} className={classes.last}>
          {loading ? (
            <div>
              <SkeletonPost />
              <SkeletonPost />
            </div>
          ) : posts.length ? (
            posts.map((p) => (
              <Post
                mb
                key={p._id}
                caption={p.caption}
                pdp={p.pdp}
                image={p.image}
                name={p.username}
                nbLikes={p.likes.length}
                nbComments={p.comments.length}
                postId={p._id}
                userId={p.userId}
                isLiked={p.isLiked}
                time={p.createdAt}
                likes={p.likes}
              />
            ))
          ) : (
            <EmptyStateContainer>
              <PhotoIcon fontSize='large' />
              <EmptyStateTitle>No posts to show.</EmptyStateTitle>
            </EmptyStateContainer>
          )}
        </Grid>
        <Grid item md={6} xs={12} lg={3} className={classes.sticky}>
          <Friends
            title='Following'
            to='/following'
            list={following?.slice(0, 3)}
          />
          <Friends
            title='Followers'
            to='/followers'
            list={followers?.slice(0, 3)}
          />
        </Grid>
      </Grid>
      <EditProfileModal open={open} handleClose={handleClose} />
    </Container>
  );
};

export default Profile;
