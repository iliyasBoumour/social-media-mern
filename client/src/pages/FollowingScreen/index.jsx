import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import HeaderProfile from '../../components/HeaderProfile';
import FriendsList from '../../components/FriendsList';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../redux/actions/userAcions';
const FollowingScreen = () => {
  const { following, userId } = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile(userId));
  }, [dispatch, userId]);

  return (
    <Container maxWidth='md'>
      <HeaderProfile />
      <FriendsList title='Following' list={following} />
    </Container>
  );
};

export default FollowingScreen;
