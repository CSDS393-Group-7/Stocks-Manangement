import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import StockManagement from './StockManagement';
import News from './News';
import Header from "./Header";
import { Box, Grid, makeStyles } from '@material-ui/core';
import NavBar from './NavBar';

const useStyles = makeStyles(theme => ({
  content: {
    width: '100%',
    paddingLeft: '50px',
    paddingTop: '20px',
  }
}));

function App() {
  const classes = useStyles();

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
