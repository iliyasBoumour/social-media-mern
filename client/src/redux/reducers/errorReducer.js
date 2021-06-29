import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  errors: {},
  status: null,
  showSnackbar: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        errors: action.payload.errors,
        status: action.payload.status,
        showSnackbar: true,
      };
    case CLEAR_ERRORS:
      return {
        errors: {},
        status: null,
        showSnackbar: false,
      };
    default:
      return state;
  }
}
