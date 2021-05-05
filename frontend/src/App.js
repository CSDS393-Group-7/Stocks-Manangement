import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './css/App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StockManagement from './pages/StockManagement';
import { Box, makeStyles } from '@material-ui/core';
import NavBar from './components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import Page403 from './pages/Page403';
import AlreadyLoggedIn from './pages/AlreadyLogIn';

const useStyles = makeStyles(theme => ({
  content: {
    width: '100%',
    padding: '35px 50px 0px',
  }
}));

function App() {
  const classes = useStyles();
  const token = useSelector(state => state.token);
  
  return (
    <div className="App">
      <Router>
        <Box display="flex">
          <NavBar />
          <Box className={classes.content}>
            <Switch>
              <Route path="/login">
                {<Login></Login>}
              </Route>
              <Route path="/signup">
                {token === null ? <Signup></Signup> : <AlreadyLoggedIn></AlreadyLoggedIn>} 
              </Route>
              <Route path="/stockmanagement">
                {token !== null ? <StockManagement></StockManagement> : <Page403></Page403>}
              </Route>
              <Route path="/">
                <Home></Home>
              </Route>
            </Switch>
          </Box>
        </Box>
      </Router>
    </div>
  );
}

export default App;
