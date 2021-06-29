import { StylesProvider } from '@material-ui/core/styles';
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import MessagesBtn from './components/MessagesBtn';
import GlobalStyle from './styles/globalStyles';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/login/Login';
import Messages from './pages/messages/Messages';
import PhotosScreen from './pages/PhotosScreen';
import FollowersScreen from './pages/FollowersScreen';
import FollowingScreen from './pages/FollowingScreen';
import { useEffect } from 'react';
import utils from './utils/socket';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import PostModal from './components/PostModal';
import PrivateRoute from './components/PrivateRoute';
import { loadUser } from './redux/actions/authActions';
import { addNotif } from './redux/actions/notificationActions';
import ErrorSnackbar from './components/ErrorSnackbar';
function App() {
  const pathName = window.location.pathname;
  const { isAuth } = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    if (utils.user) {
      utils.socket.emit('identity', utils.user);
      utils.socket.on('notification', (data) => {
        enqueueSnackbar(data.notification);
        dispatch(addNotif(data.notification));
      });
    }
  }, [dispatch, enqueueSnackbar]);
  return (
    <Router>
      <StylesProvider injectFirst>
        <GlobalStyle />
        {isAuth && <Navbar />}
        <Switch>
          {/* <Route path="/" exact component={Home} /> */}
          {/* <Route path="/profile" component={Profile} /> */}
          {/* <Route path="/login" component={Login} /> */}
          {/* <Route path="/messages" component={Messages} />
                <Route path="/photos" component={PhotosScreen} />
                 */}

          <PrivateRoute exact component={Home} path='/' />
          <PrivateRoute exact component={Profile} path='/profile' />
          <PrivateRoute exact component={Messages} path='/messages' />
          <PrivateRoute exact component={PhotosScreen} path='/photos' />
          <PrivateRoute exact component={FollowersScreen} path='/followers' />
          <PrivateRoute exact component={FollowingScreen} path='/following' />
          <Route exact path='/login'>
            {isAuth ? <Redirect to='/' /> : <Login />}
          </Route>
        </Switch>
        {isAuth && pathName !== '/messages' && <MessagesBtn />}
        <PostModal />
        <ErrorSnackbar />
      </StylesProvider>
    </Router>
  );
}

export default App;
