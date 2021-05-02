import React from 'react';

import { makeStyles, Box, Button, IconButton, Chip } from '@material-ui/core';

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
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    width: '250px',
    fontWeight: 'bold',
  },
  dateTime: {
    fontSize: 'smaller',
    fontWeight: 500
  },
  readButton: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  contentTypeChip: {
    marginRight: '5px',
  },
}));

function BriefNewsBox(props) {
  const classes = useStyles();

  const formatDateTime = (datetime) => (new Date(datetime)).toDateString();

  const formatTitle = (title) => (title.length < 75 ? title : title.substr(0, 75) + '...');

  return (
    <>
      <Box display="flex" flexDirection="row" className={classes.root}>
        <img className={classes.img} src={props.thumbnailUrl} />
        <div className={classes.title}>
          <span>
            <Chip className={classes.contentTypeChip} label={props.contentType} variant="outlined" color="primary" size="small" />
            {formatTitle(props.title)}
          </span>
          <p className={classes.dateTime}>{formatDateTime(props.publicationDate)}</p>
        </div>
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