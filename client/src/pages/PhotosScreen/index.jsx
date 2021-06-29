import React from 'react';
import { Container } from '@material-ui/core';
import HeaderProfile from '../../components/HeaderProfile';
import PhotosList from '../../components/PhotosList';

const PhotosScreen = () => {
  return (
    <Container maxWidth='md'>
      <HeaderProfile />
      <PhotosList />
    </Container>
  );
};

export default PhotosScreen;
