import { Backdrop, useTheme } from '@material-ui/core';
import { PacmanLoader } from 'react-spinners';
import React from 'react';

function Loading({ open }) {
  const theme = useTheme();

  return (
    <Backdrop open={open}>
      <PacmanLoader color={theme.palette.primary.main} size={25} />
    </Backdrop>
  )
}

export default Loading;