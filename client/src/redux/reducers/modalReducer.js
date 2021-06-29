import { OPEN_MODAL, CLOSE_MODAL } from '../actions/types';
const modalReducer = (state = { isOpen: false, postId: null }, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, isOpen: true, postId: action.payload.postId };
    case CLOSE_MODAL:
      return { ...state, isOpen: false, postId: null };
    default:
      return state;
  }
};

export default modalReducer;
