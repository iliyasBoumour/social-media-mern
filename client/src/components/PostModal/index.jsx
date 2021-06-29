import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Post from '../Post';
import CommentItem from '../CommentItem';
import { useStyles } from './style';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/actions/modalActions';
import SkeletonComment from '../SkeletonComment'

const PostModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isOpen, postId } = useSelector((state) => state.modal);
  const { posts, loadingAddComment } = useSelector((state) => state.post);
  const post = posts.find((p) => p._id.toString() === postId);
  return (
    <div>
      <Modal
        className={classes.modal}
        open={isOpen}
        onClose={() => dispatch(closeModal())}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={isOpen}>
          <div className={classes.wrapper}>
            {post && (
              <Post
                caption={post.caption}
                pdp={post.pdp}
                image={post.image}
                name={post.username}
                nbLikes={post.likes.length}
                nbComments={post.comments.length}
                userId={post.userId}
                isLiked={post.isLiked}
                likes={post.likes}
                postId={post._id}>
                {loadingAddComment && <SkeletonComment />}
                {post.comments.map((c) => (
                  <CommentItem
                    key={c._id}
                    pdp={c.pdp}
                    name={c.username}
                    comment={c.comment}
                    userId={c.userId}
                    postId={post._id}
                    commentId={c._id}
                    time={c.createdAt}
                  />
                ))}
              </Post>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default PostModal;
