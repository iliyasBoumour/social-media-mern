import { OPEN_MODAL, CLOSE_MODAL } from './types';
export const openModal = (postId) => {
  return {
    type: OPEN_MODAL,
    payload: {
      postId,
    },
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};
