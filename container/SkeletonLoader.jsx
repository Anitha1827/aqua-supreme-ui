import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const SkeletonLoader = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="text"  height={50}/>
      <Skeleton variant="text"  height={50}/>
    </Stack>
  );
};

export default SkeletonLoader;
