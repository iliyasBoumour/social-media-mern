import React, { useState, useRef } from 'react';
import { SearchContainer, SearchInput } from './style';
import SearchIcon from '@material-ui/icons/Search';
import SearchCard from '../SearchCard';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Search = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const anchorRef = useRef(null);
  const token = useSelector((state) => state.auth.token);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const search = async (e) => {
    //config headers
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    if (token) config.headers['auth-token'] = token;

    try {
      const { data } = await axios.get(
        `/api/users?q=${e.target.value}`,
        config,
      );
      setUsers(data);
    } catch (error) {}
  };
  return (
    <>
      <SearchContainer>
        <SearchIcon />
        <SearchInput
          onFocus={handleToggle}
          ref={anchorRef}
          type='text'
          placeholder='Search...'
          onChange={search}
        />
      </SearchContainer>
      <SearchCard
        open={open}
        anchorEl={anchorRef.current}
        close={handleClose}
        users={users}
      />
    </>
  );
};

export default Search;
