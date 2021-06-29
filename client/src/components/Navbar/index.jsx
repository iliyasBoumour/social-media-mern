import React, { useState, useRef } from 'react';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavLink,
  NavItem,
  StyledAvatar,
  NotifItem,
} from './style';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Badge from '@material-ui/core/Badge';
import NotifCard from '../NotifCard';
import { useSelector, useDispatch } from 'react-redux';
//import logout function action
import { logout } from '../../redux/actions/authActions';
import { useHistory } from 'react-router-dom';
import { getNotif } from '../../redux/actions/notificationActions';
import Search from '../Search';
import { getUserId } from '../../redux/actions/userAcions';
import utils from "../../utils/socket";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const { currentUserId, user } = useSelector((state) => state.auth);
  const { count } = useSelector((state) => state.notification);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    dispatch(getNotif());
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    utils.socket.emit("logout", utils.user);
    history.push('/login');
  };

  return (
    <>
      <NotifCard open={open} anchorEl={anchorRef.current} close={handleClose} />
      <Nav>
        <NavbarContainer>
          <NavLogo to='/'>
            <NavIcon fontSize='large' />
            LOGO
          </NavLogo>
          <Search />

          <MobileIcon
            onClick={() => {
              setClick(!click);
            }}>
            {click ? (
              <CloseOutlinedIcon fontSize='inherit' />
            ) : (
              <MenuOutlinedIcon fontSize='inherit' />
            )}
          </MobileIcon>
          <NavMenu click={click}>
            <NavItem onClick={() => setClick(!click)}>
              <NavLink to='/'>
                <HomeIcon />
              </NavLink>
            </NavItem>
            <NavItem onClick={handleToggle} ref={anchorRef}>
              <NotifItem>
                <Badge badgeContent={open ? 0 : count} color='error'>
                  <NotificationsIcon />
                </Badge>
              </NotifItem>
            </NavItem>
            <NavItem onClick={() => setClick(!click)}>
              <NavLink
                to={'/profile'}
                onClick={() => dispatch(getUserId(currentUserId))}>
                <StyledAvatar
                  alt='pdp'
                  src={
                    user?.pdp
                      ? `data:${user?.pdp.contentType};base64, ${user?.pdp.data}`
                      : user?.pdp
                  }
                />
              </NavLink>
            </NavItem>
            <NavItem>
              <NotifItem onClick={handleLogout}>
                <ExitToAppIcon />
              </NotifItem>
            </NavItem>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
