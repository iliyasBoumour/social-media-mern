import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import { Div, Name } from './style';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import utils from '../../utils/socket';
import { useSelector } from 'react-redux';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const ContactItem = ({ _id, pdp, username, status }) => {
  const pers = { _id, pdp, username, status };
  const history = useHistory();
  const { token } = useSelector((state) => state.auth);
  const handleClick = async () => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    if (token) config.headers['auth-token'] = token;
    const { data } = await axios.get(
      `/conversations/${_id}/${utils.user}`,
      config,
    );
    console.log('get conv with clicked person');
    pers.convId = data._id;
    data &&
      history.push({
        pathname: '/Messages',
        pers,
      });
  };
  return (
    <Div onClick={handleClick}>
      <StyledBadge
        overlap='circle'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant='dot'>
        <Avatar
          alt='Remy Sharp'
          src={pdp ? `data:${pdp.contentType};base64, ${pdp.data}` : pdp}
        />
      </StyledBadge>
      <Name>{username}</Name>
    </Div>
  );
};

export default ContactItem;
