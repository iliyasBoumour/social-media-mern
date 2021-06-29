import React, { useState } from 'react';
import {
  Div,
  Name,
  StyledAvatar,
  FlexDiv,
  OutlinedButton,
  PrimaryButton,
} from './style';
import { useSelector, useDispatch } from 'react-redux';
import { getUserId } from '../../redux/actions/userAcions';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const UserItem = ({ img, name, status, userId }) => {
  const [isFollowed, setIsFollowed] = useState(status);
  const { currentUserId, token } = useSelector((state) => state.auth);
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const showProfile = () => {
    dispatch(getUserId(userId));
    history.push('/profile');
  };
  const follow = async () => {
    //config headers
    setIsFollowed(!isFollowed);
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
    setIsFollowed(!isFollowed);
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
  return (
    <Div>
      <FlexDiv>
        <StyledAvatar
          onClick={showProfile}
          src={img ? `data:${img.contentType};base64, ${img.data}` : img}
        />
        <Name onClick={showProfile}>{name}</Name>
      </FlexDiv>
      {currentUserId !== userId ? (
        isFollowed ? (
          <OutlinedButton disabled={disable} onClick={unfollow}>
            Unfollow
          </OutlinedButton>
        ) : (
          <PrimaryButton disabled={disable} onClick={follow}>
            Follow
          </PrimaryButton>
        )
      ) : null}
    </Div>
  );
};

export default UserItem;
