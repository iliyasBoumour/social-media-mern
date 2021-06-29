import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import CardHeader from '@material-ui/core/CardHeader';

const SkeletonComment = () => {
  return (
    <CardHeader
      avatar={
        <Skeleton animation='wave' variant='circle' width={40} height={40} />
      }
      title={
        <Skeleton
          animation='wave'
          height={10}
          width='80%'
          style={{ marginBottom: 6 }}
        />
      }
      subheader={<Skeleton animation='wave' height={10} width='40%' />}
    />
  );
};

export default SkeletonComment;
