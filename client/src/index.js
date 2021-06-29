import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { SnackbarProvider } from 'notistack';
import NotifSnackbar from './components/NotifSnackbar';

import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={4}
      content={(key, notification) => (
        <NotifSnackbar id={key} notification={notification} />
      )}>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root'),
);
