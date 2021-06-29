import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_ERRORS } from '../../redux/actions/types';
function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const ErrorSnackbar = () => {
  const { showSnackbar, errors } = useSelector((state) => state.errorsAuth);
  const { errors: err } = errors;
  let messages = [];
  for (const field in err) {
    messages.push(err[field].msg);
  }
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({
      type: CLEAR_ERRORS,
    });
  };
  return (
    <Snackbar open={showSnackbar} autoHideDuration={8000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='error'>
        {errors.message || errors.msg || messages.map((msg) => <p>{msg}</p>)}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
