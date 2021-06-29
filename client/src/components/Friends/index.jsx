import React from 'react';
import {
  Card,
  Title,
  Body,
  EmptyStateContainer,
  EmptyStateTitle,
} from './style';
import { Header } from '../Photos/style';
import { Button } from '../InfoCard/style';
import { useHistory } from 'react-router-dom';
import UserItem from '../UserItem';
import PersonIcon from '@material-ui/icons/Person';
const Friends = ({ title, to, list }) => {
  const history = useHistory();
  return (
    <Card>
      <Header>
        <Title>{title}</Title>
        <Button
          onClick={(e) => {
            history.push(to);
          }}>
          View All
        </Button>
      </Header>
      <Body>
        {list?.length ? (
          list
            ?.slice(0, 3)
            .map((s) => (
              <UserItem
                key={s.userId}
                img={s.pdp}
                name={s.username}
                status={s.isFollow}
                userId={s.userId}
              />
            ))
        ) : (
          <EmptyStateContainer>
            <PersonIcon fontSize='large' />
            <EmptyStateTitle>{`No users to show.`}</EmptyStateTitle>
          </EmptyStateContainer>
        )}
      </Body>
    </Card>
  );
};

export default Friends;
