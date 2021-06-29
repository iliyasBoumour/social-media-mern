import React, { useState, useEffect } from 'react';
import { Card, Title, Body } from './style';
import { Button } from '../InfoCard/style';
import { Header } from '../Photos/style';
import { suggestions } from '../../data/home';
import UserItem from '../UserItem';
import SuggestionsModal from '../SuggestionsModal';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Suggestions = () => {
  const [open, setOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = async () => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    if (token) config.headers['auth-token'] = token;
    try {
      const { data } = await axios.get('/api/users/suggestion', config);
      setUsers(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <Card>
        <Header>
          <Title>Suggestions</Title>
          <Button onClick={() => setOpen(!open)}>View All</Button>
        </Header>
        <Body>
          {users.slice(0, 3).map((s) => (
            <UserItem
              key={s._id}
              name={s.username}
              img={s.pdp}
              userId={s._id}
              close={() => setOpen(!open)}
              status={false}
            />
          ))}
        </Body>
      </Card>
      <SuggestionsModal
        open={open}
        handleClose={() => setOpen(!open)}
        suggestions={users}
      />
    </>
  );
};

export default Suggestions;
