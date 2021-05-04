import React, { useState, useEffect } from 'react';
import { Button, Card, CardActions, CardContent, Divider, Grid, makeStyles, Paper, TextField } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import BriefNewsBox from './BriefNewsBox';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    marginTop: '10px',
  },
  seeMoreButton: {
    marginLeft: 'auto',
  },
  newsListCard: {
    marginTop: '5px',
    padding: '0px 5px 0px'
  }
}));

function News({ triggerLoading, triggerUnloading }) {
  const classes = useStyles();

  const [searchText, setSearchText] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    triggerLoading();
    fetch('http://localhost:8000/api/news/get-list', { method: 'GET' })
    .then(res => res.json())
    .then(data => {
      setNewsList(data);
      triggerUnloading();
    });
  }, []);

  const handleSearchKeyDown = (e) => {
    if (e.keyCode !== 13)
      return;
    fetch('http://localhost:8000/api/news/search', {
      headers: {
          "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({
        keywords: searchText
      })
    }).then(res => res.json())
      .then(data => {
        setNewsList(data);
        setIsLoading(false);
      });
  }

  return (
    <Grid container className={classes.root}>
      <TextField
        label="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        fullWidth
        helperText="Type keywords and Enter"
        onKeyDown={handleSearchKeyDown}
        margin='dense'
        variant="outlined"
      />
      <Card elevation={0} className={classes.newsListCard}>
        {newsList.map((news, id) => (isExpanded || id < 5) && (
          <>
            <BriefNewsBox {...news} handleViewNews={() => window.open(news['originalUrl'], "_blank")} />
            <Divider />
          </>
        ))}
        <CardActions>
          <Button 
            className={classes.seeMoreButton}
            endIcon={!isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            onClick={() => setIsExpanded(oldVal => !oldVal)}
          >
            {!isExpanded ? "See More" : "See Less"}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default News;