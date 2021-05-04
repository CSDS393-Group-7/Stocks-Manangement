import { Paper, CardHeader, Box, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';

import Chart from '../components/Chart';
import News from '../components/News';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import "../css/Home.css";

const useStyles = makeStyles(theme => ({
  box: {
    marginTop: '35px',
    width: '100%',
    justifyContent: "space-between",
  },
  suggestionPaper: {
    marginRight: '30px',
    width: 'fill-available',
  },
  newsPaper: {

  }
}));

const Home = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(0);

  const triggerLoading = () => setLoading(value => value + 1);
  const triggerUnloading = () => setLoading(value => value - 1); 

  return (
    <>
      <Loading open={loading > 0} delayed={1100} />
      <Paper>
        <CardHeader title="General Watchlist" />
        <Chart/>
      </Paper>
      <Box className={classes.box} display="flex">
        <Paper className={classes.suggestionPaper}>
          <CardHeader title="Suggestion Table" />
        </Paper>
        <Paper>
          <CardHeader title="News" />
          <News triggerLoading={triggerLoading} triggerUnloading={triggerUnloading} />
        </Paper>
      </Box>
    </>
  );
};

export default Home;