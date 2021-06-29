import React from 'react';
import { Avatar } from '@material-ui/core';

const Msg = ({ image, msg, sended }) => {
  const type = sended ? 'sent' : 'received';
  return (
    <div className={type}>
      <div className='received'>
        {type === 'received' && (
          <Avatar
            src={
              image ? `data:${image.contentType};base64, ${image.data}` : image
            }
          />
        )}
        <p>{msg}</p>
      </div>
    </div>
  );
};

export default Msg;
