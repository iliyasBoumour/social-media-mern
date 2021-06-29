import React from 'react';
import { Header, StyledAvatar } from './style';
import { Bold, Light } from '../InfoCard/style.js';
import { useSelector } from 'react-redux';

const HeaderProfile = () => {
  const { username, bio, pdp } = useSelector((state) => state.userProfile);
  return (
    <Header>
      <StyledAvatar
        src={pdp ? `data:${pdp.contentType};base64, ${pdp.data}` : pdp}
      />
      <Bold>{username}</Bold>
      <Light>{bio}</Light>
    </Header>
  );
};

export default HeaderProfile;
