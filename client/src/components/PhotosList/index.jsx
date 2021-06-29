import React, { useEffect } from 'react';
import { Card, Header, Title } from '../Friends/style';
import {
  Body,
  Image,
  ImageContainer,
  EmptyStateContainer,
  EmptyStateTitle,
} from './style';
import { Container, Grid, Box, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/actions/modalActions';
import { loadProfilePosts } from '../../redux/actions/postActions.js';
import { getUserProfile } from '../../redux/actions/userAcions';
import PhotoIcon from '@material-ui/icons/Photo';

const useStyle = makeStyles({
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const PhotosList = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.post);
  const { userId } = useSelector((state) => state.userProfile);
  const postsWithImage = posts.filter((post) => !!post.image);
  const classes = useStyle();
  useEffect(() => {
    dispatch(getUserProfile(userId));
    dispatch(loadProfilePosts(userId));
  }, [dispatch, userId]);
  return (
    <Card style={{ marginBottom: '1rem' }}>
      <Header>
        <Title>Photos</Title>
      </Header>
      <Body>
        <Container maxWidth='md'>
          <Grid container spacing={3}>
            {loading ? (
              <Box
                width='100%'
                height='60vh'
                display='flex'
                justifyContent='center'
                alignItems='center'>
                <CircularProgress style={{ color: '#ab987a' }} />
              </Box>
            ) : postsWithImage.length ? (
              postsWithImage.map((p) => (
                <Grid
                  key={p._id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  className={classes.item}>
                  <ImageContainer>
                    <Image
                      src={`data:${p.image.contentType};base64, ${p.image.data}`}
                      onClick={() => dispatch(openModal(p._id))}
                    />
                  </ImageContainer>
                </Grid>
              ))
            ) : (
              <EmptyStateContainer>
                <PhotoIcon fontSize='large' />
                <EmptyStateTitle>No photos to show.</EmptyStateTitle>
              </EmptyStateContainer>
            )}
          </Grid>
        </Container>
      </Body>
    </Card>
  );
};

export default PhotosList;
