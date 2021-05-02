import React from 'react';

import { makeStyles, Box, Button, IconButton } from '@material-ui/core';

import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles(theme => ({
  root: {
    height: '90px',
    marginTop: '10px',
    marginBottom: '10px',
    alignItems: 'center'
  },
  img: {
    width: 'auto',
    height: "100%",
    borderRadius: '10px'
  },
  title: {
    paddingLeft: '10px',
    display: 'block',
    width: '250px',
    fontWeight: 'bold',
  },
  readButton: {
    marginLeft: 'auto',
    marginRight: 0,
  }
}));

function BriefNewsBox(props) {
  const classes = useStyles();

  return (
    <>
      <Box display="flex" flexDirection="row" className={classes.root}>
        <img className={classes.img} src={props.thumbnailUrl} />
        <span className={classes.title}>{props.title}</span>
        <IconButton 
          className={classes.readButton}
          onClick={props.handleViewNews}
        >
          <VisibilityIcon />
        </IconButton>
      </Box>
    </>
  );
}

export default BriefNewsBox;