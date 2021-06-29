import React, { useState, useEffect } from 'react';
import { Card, Header, Title } from '../Friends/style';
import {
  SearchContainer,
  SearchInput,
  Item,
  EmptyStateContainer,
  EmptyStateTitle,
} from './style';
import { Body } from '../PhotosList/style';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import UserItem from '../UserItem';
import PersonIcon from '@material-ui/icons/Person';

const useStyle = makeStyles({
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const FriendsList = ({ list, title }) => {
  const classes = useStyle();
  const [name, setName] = useState('');
  const [items, setItems] = useState(list);

  useEffect(() => {
    setItems(list);
  }, [list]);

  const searchHandler = (e) => {
    setName(e.target.value);
    setItems(
      list.filter((f) =>
        f.username
          .trim()
          .toLowerCase()
          .includes(e.target.value.trim().toLowerCase()),
      ),
    );
  };
  return (
    <Card style={{ marginBottom: '1rem' }}>
      <Header style={{ justifyContent: 'space-between' }}>
        <Title>{title}</Title>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            value={name}
            type='text'
            placeholder='Search...'
            onChange={searchHandler}
          />
        </SearchContainer>
      </Header>
      <Body>
        <Container maxWidth='md'>
          <Grid container spacing={5}>
            {items?.length ? (
              items?.map((f) => (
                <Grid item xs={12} sm={6} key={f.id} className={classes.item}>
                  <Item>
                    <UserItem
                      img={f.pdp}
                      name={f.username}
                      userId={f.userId}
                      status={f.isFollow}
                    />
                  </Item>
                </Grid>
              ))
            ) : (
              <EmptyStateContainer>
                <PersonIcon fontSize='large' />
                <EmptyStateTitle>{`No users to show.`}</EmptyStateTitle>
              </EmptyStateContainer>
            )}
          </Grid>
        </Container>
      </Body>
    </Card>
  );
};

export default FriendsList;
