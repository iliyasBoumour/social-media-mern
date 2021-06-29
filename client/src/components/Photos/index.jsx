import React from 'react';
import {
  Card,
  Header,
  Title,
  Button,
  Body,
  Image,
  ImageContainer,
  EmptyStateContainer,
  EmptyStateTitle,
} from './style';
import { Grid } from '@material-ui/core';
// import { photos } from '../../data/profile';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../redux/actions/modalActions';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import PhotoIcon from '@material-ui/icons/Photo';

const useStyles = makeStyles((theme) => ({
  img: {
    [theme.breakpoints.down('md')]: {
      height: '204px',
    },
    [theme.breakpoints.up('lg')]: {
      height: '120px',
    },
  },
}));

const Photos = () => {
  const classes = useStyles();
  const history = useHistory();

  const { posts, loading } = useSelector((state) => state.post);
  const postsWithImage = posts.filter((post) => !!post.image).slice(0, 4);
  const dispatch = useDispatch();

  return (
    <Card>
      <Header>
        <Title>Photos</Title>
        <Button onClick={() => history.push('/photos')}>View All</Button>
      </Header>
      <Body>
        <Grid container>
          {loading ? (
            <Box
              width='100%'
              height='200px'
              display='flex'
              justifyContent='center'
              alignItems='center'>
              <CircularProgress style={{ color: '#ab987a' }} />
            </Box>
          ) : postsWithImage.length ? (
            postsWithImage.map((p) => {
              return (
                <Grid item key={p.id} xs={6}>
                  <ImageContainer className={classes.img}>
                    <Image
                      onClick={() => dispatch(openModal(p._id))}
                      src={`data:${p.image.contentType};base64, ${p.image.data}`}
                    />
                  </ImageContainer>
                </Grid>
              );
            })
          ) : (
            <EmptyStateContainer>
              <PhotoIcon fontSize='large' />
              <EmptyStateTitle>No photos to show.</EmptyStateTitle>
            </EmptyStateContainer>
          )}
        </Grid>
      </Body>
    </Card>
  );
};

export default Photos;
