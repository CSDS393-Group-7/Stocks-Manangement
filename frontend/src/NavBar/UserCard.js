import React from 'react';

import { makeStyles, Avatar, Typography } from '@material-ui/core';

import MinhHieuIdol from '../static/default-avatar.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '12px',
    backgroundColor: 'rgba(145, 158, 171, 0.12)',
    margin: '20px 20px 40px',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
  },
  info: {
    marginLeft: '16px',
  }
}))

function UserCard(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt="Admin" src={MinhHieuIdol} />
      <div className={classes.info}>
        <Typography variant="subtitle2">{props.name}</Typography>
        <Typography variant="body2">{props.role}</Typography>
      </div>
    </div>
  );
}

export default UserCard;