import { GET_USER_PROFILE, GET_USER_PROFILE_SUCCESS } from '../actions/types';

const initialState = {
  userId: localStorage.getItem('userProdileId'),
  username: null,
  bio: null,
  pdp: null,
  status: null,
  followers: null,
  following: null,
  isFollow: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROFILE:
      localStorage.setItem('userProdileId', action.payload.id);
      return {
        ...state,
        userId: action.payload.id,
      };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userId: action.payload._id,
        username: action.payload.username,
        bio: action.payload.bio,
        pdp: action.payload.pdp,
        status: action.payload.status,
        followers: action.payload.followers,
        following: action.payload.following,
        isFollow: action.payload.isFollow,
      };
    default:
      return state;
  }
}
