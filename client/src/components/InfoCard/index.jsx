import React from 'react';
import {
  Card,
  List as StyledList,
  ListItem as Item,
  Header,
  StyledAvatar,
  Bold,
  Light,
  Button,
} from './style';
import { useSelector, useDispatch } from 'react-redux';
import { getUserId } from '../../redux/actions/userAcions';
import { useHistory } from 'react-router-dom';
const InfoCard = () => {
  const { user, currentUserId } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <Card>
      <Header>
        <StyledAvatar
          src={
            user?.pdp
              ? `data:${user?.pdp.contentType};base64, ${user?.pdp.data}`
              : user?.pdp
          }
        />
      </Header>
      <StyledList>
        <Item>
          <Bold>{user?.username}</Bold>
          <Light>{user?.bio} </Light>
        </Item>
        <Item>
          <Light>Following</Light>
          <Bold>{user?.followingCount}</Bold>
        </Item>
        <Item>
          <Light>Followers</Light>
          <Bold>{user?.followersCount} </Bold>
        </Item>
        <Item>
          <Light>Posts</Light>
          <Bold>{user?.postsCount}</Bold>
        </Item>
        <Item>
          <Button
            onClick={() => {
              dispatch(getUserId(currentUserId));
              history.push('/profile');
            }}>
            View Profile
          </Button>
        </Item>
      </StyledList>
    </Card>
  );
};

export default InfoCard;
