import { Backdrop, useTheme } from '@material-ui/core';
import { PacmanLoader } from 'react-spinners';
import React, { useEffect, useState } from 'react';

/**
 * Loading Backdrop transition
 * @param {boolean} open      Whether the loading shows up or not
 * @param {number}  delayed   (optional) The period of time the loading stays after open === false
 */
function Loading({ open, delayed }) {
  const theme = useTheme();

  const [trueOpen, setTrueOpen] = useState(true);

  useEffect(() => {
    if (open || !delayed)
      setTrueOpen(open);
    else
      setTimeout(() => setTrueOpen(open), delayed)
  }, open)

  return (
    <Backdrop open={trueOpen} transitionDuration={500} style={{zIndex: 100000, backgroundColor: 'rgb(0 0 0 / 50%)'}}>
      <PacmanLoader color={theme.palette.primary.light} size={27} />
    </Backdrop>
  )
}

export default Loading;