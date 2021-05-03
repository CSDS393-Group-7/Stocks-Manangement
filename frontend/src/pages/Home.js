import { Paper, CardHeader, Box, makeStyles } from '@material-ui/core';
import React from 'react';

import Chart from '../components/Chart';
import News from '../components/News';
import { useSelector } from 'react-redux';
import "../css/Home.css";

const useStyles = makeStyles(theme => ({
  box: {
    marginTop: '30px',
    width: '100%',
    justifyContent: "space-between",
  },
  suggestionPaper: {
    marginRight: '15px',
    width: 'fill-available',
  },
  newsPaper: {

  }
}));

const Home = () => {
  const classes = useStyles();
  const user = useSelector(state => state.user);

  return (
    <>
      <Paper>
        <CardHeader title="General Watchlist" />
        <Chart />
      </Paper>
      <Box className={classes.box} display="flex">
        <Paper className={classes.suggestionPaper}>
          <CardHeader title="Suggestion Table" />
        </Paper>
        <Paper>
          <CardHeader title="News" />
          <News />
        </Paper>
      </Box>
    </>
  );
};

export default Home;