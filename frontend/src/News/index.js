import React, { useState, useEffect } from 'react';
import { Button, Card, CardActions, CardContent, Divider, Grid, makeStyles, Paper, TextField } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import BriefNewsBox from './BriefNewsBox';
import FullContentDialog from './FullContentDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    marginTop: '20px',
  },
  seeMoreButton: {
    marginLeft: 'auto',
  },
  newsListCard: {
    marginTop: '5px',
  }
}));

function News() {
  const classes = useStyles();

  const [searchText, setSearchText] = useState('');

  const [isExpanded, setIsExpanded] = useState(false);

  const [newsList, setNewsList] = useState([]);

  const [newsToView, setNewsToView] = useState({});

  useEffect(() => {
    fetch('http://localhost:8000/api/news/get-list', { method: 'GET' })
    .then(res => res.json())
    .then(data => setNewsList(data));
  }, []);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={3}>
        <TextField
          label="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          fullWidth
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
    </Grid>
  );
}

export default News;