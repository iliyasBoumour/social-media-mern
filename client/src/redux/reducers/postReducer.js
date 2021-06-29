import {
  GET_POSTS_LOADING,
  GET_POSTS_SUCCESS,
  ADD_POST,
  ADD_POST_SUCCESS,
  DELETE_POST,
  UPDATE_POST,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  ADD_LIKE,
  ADD_LIKE_SUCCESS,
  REMOVE_LIKE,
  REMOVE_LIKE_SUCCESS,
  UPDATE_LIKES_SOCKET,
  UPDATE_COMMENTS_SOCKET,
} from '../actions/types';

const postReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_POSTS_LOADING:
      return { ...state, loading: true, posts: [] };
    case GET_POSTS_SUCCESS:
      return { ...state, loading: false, posts: action.payload.posts };
    case ADD_POST:
      return {
        ...state,
        loadingAddPost: true,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [action.payload.post, ...state.posts],
        loadingAddPost: false,
      };
    case DELETE_POST:
      return { ...state, posts: action.payload.posts };
    case UPDATE_POST:
      return { ...state, posts: action.payload.posts };
    case ADD_COMMENT:
      return {
        ...state,
        loadingAddComment: true,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        loadingAddComment: false,
        posts: action.payload.posts,
      };
    case UPDATE_COMMENT:
      return { ...state, posts: action.payload.posts };
    case DELETE_COMMENT:
      return { ...state, posts: action.payload.posts };
    case ADD_LIKE:
      return { ...state, loadingLike: true };
    case ADD_LIKE_SUCCESS:
      return { ...state, posts: action.payload.posts, loadingLike: false };
    case REMOVE_LIKE:
      return { ...state, loadingLike: true };
    case REMOVE_LIKE_SUCCESS:
      return { ...state, posts: action.payload.posts, loadingLike: false };
    case UPDATE_LIKES_SOCKET:
      return { ...state, posts: action.payload.posts };
    case UPDATE_COMMENTS_SOCKET:
      return { ...state, posts: action.payload.posts };
    default:
      return state;
  }
};

export default postReducer;
