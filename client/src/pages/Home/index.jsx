import React, { useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import Contacts from '../../components/Contacts';
import InfoCard from '../../components/InfoCard';
import Suggestions from '../../components/Suggestions';
import AddPost from '../../components/AddPost';
import Post from '../../components/Post';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { loadHomePosts } from '../../redux/actions/postActions';
import SkeletonPost from '../../components/SkeletonPost';
import PhotoIcon from '@material-ui/icons/Photo';
import { EmptyStateContainer, EmptyStateTitle } from './style';

const useStyles = makeStyles((theme) => ({
  sticky: {
    position: 'sticky',
    height: 'fit-content',
    top: '70px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  middle: {
    width: '100%',
  },
}));

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading, loadingAddPost } = useSelector((state) => state.post);
  const { currentUserId } = useSelector((state) => state.auth);
  const classes = useStyles();

  useEffect(() => {
    dispatch(loadHomePosts(currentUserId));
  }, [dispatch, currentUserId]);
  return (
    <Container maxWidth='lg'>
      <Grid container spacing={3}>
        <Grid item md={3} className={classes.sticky}>
          <InfoCard />
          <Suggestions />
        </Grid>
        <Grid item sm={12} md={6} className={classes.middle}>
          <AddPost />
          {loadingAddPost && <SkeletonPost />}
          {loading ? (
            <div>
              <SkeletonPost />
              <SkeletonPost />
            </div>
          ) : posts.length ? (
            posts.map((p) => (
              <Post
                mb
                key={p._id}
                caption={p.caption}
                pdp={p.pdp}
                image={p.image}
                name={p.username}
                nbLikes={p.likes.length}
                nbComments={p.comments.length}
                userId={p.userId}
                postId={p._id}
                isLiked={p.isLiked}
                time={p.createdAt}
                likes={p.likes}
              />
            ))
          ) : (
            !loadingAddPost && (
              <EmptyStateContainer>
                <PhotoIcon fontSize='large' />
                <EmptyStateTitle>No posts to show.</EmptyStateTitle>
              </EmptyStateContainer>
            )
          )}
        </Grid>
        <Grid item md={3} className={classes.sticky}>
          <Contacts />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
