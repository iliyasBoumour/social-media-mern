import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import utils from '../../utils/socket';
import moment from 'moment';
import axios from 'axios';
import { useSelector } from 'react-redux';

const DiscutionCard = ({ onClick, cnv }) => {
  const { members, _id, updatedAt } = cnv;
  const [user, setUser] = useState({});
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const getUser = async () => {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      if (token) config.headers['auth-token'] = token;
      const otherUserId = members.find((member) => member !== utils?.user);
      const { data } = await axios(`/api/users/${otherUserId}`, config);
      setUser(data);
    };
    getUser();
  }, [members]);

  return (
    <div onClick={() => onClick(user, _id)} className='disc-card'>
      {/* user.status  */}
      <Avatar
        src={
          user.pdp
            ? `data:${user.pdp.contentType};base64, ${user.pdp.data}`
            : user.pdp
        }
      />
      <div className='disc-info'>
        <h2>{user.username}</h2>
        <p>{cnv.lastMessage?.substring(0, 8)}</p>
      </div>

      <p>{moment(updatedAt).fromNow(true)}</p>
    </div>
  );
};

export default DiscutionCard;
