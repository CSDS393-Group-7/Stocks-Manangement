import React from 'react';

import { makeStyles, Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '12px',
    backgroundColor: 'rgba(145, 158, 171, 0.12)',
    margin: '50px 20px 40px',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
  },
  info: {
    marginLeft: '16px',
  },
  avatar: {
    backgroundColor: '#007b55d9',
  }
}))

function UserCard(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {console.log(props.name)}
      <Avatar className={classes.avatar} alt="Admin">{props.name[0].toUpperCase()}</Avatar>
      <div className={classes.info}>
        <Typography variant="subtitle2">{props.name}</Typography>
        <Typography variant="body2">{props.role}</Typography>
      </div>
    </div>
  );
}

export default UserCard;