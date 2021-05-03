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
import { setUser } from './store/user/user';

const useStyles = makeStyles(theme => ({
  content: {
    width: '100%',
    padding: '35px 50px 0px',
  }
}));

function App() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(state => state.user);
  
  return (
    <div className="App">
      <Router>
        <Box display="flex">
          <NavBar />
          <Box className={classes.content}>
            <Switch>
              <Route path="/login">
                <Login></Login>
              </Route>
              <Route path="/signup">
                <Signup></Signup>
              </Route>
              <Route path="/stockmanagement">
                <StockManagement></StockManagement>
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
