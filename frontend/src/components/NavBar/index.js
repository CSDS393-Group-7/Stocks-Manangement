import React, { useState } from 'react';
import "../../css/Header.css";
import { Link } from 'react-router-dom';
import UserCard from './UserCard';
import { Box, Button, Chip, List, ListItem, makeStyles } from '@material-ui/core';

import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    width: '250px',
    minWidth: '250px',
    borderRight: '1px solid rgba(145, 158, 171, 0.24)',
    paddingTop: '20px',
    position: 'relative',
  },
  navItem: {
    paddingLeft: '40px',
    height: '45px',
  },
  navItemActive: {
    paddingLeft: '40px',
    height: '45px',
    backgroundColor: 'rgba(0, 171, 85, 0.08)',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    '&::before': {
      width: '3px',
      position: 'absolute',
      content: '""',
      top: 0,
      bottom: 0,
      right: 0,
      backgroundColor: theme.palette.primary.main,
    }
  },
  loginButArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
  },
  signupArea: {
    marginTop: '10px',
  },
}));

function NavBar() {
  const classes = useStyles();

  const [activeTab, setActiveTab] = useState("Home");

  const navList = [
    {
      label: 'Home',
      path: '/home',
    },
    {
      label: 'Stock Management',
      path: '/stockmanagement',
    },
    {
      label: 'Login',
      path: '/login',
    },
    {
      label: 'Register',
      path: '/signup',
    },
  ];

  const user = useSelector(state => state.user);

  // Tracks if there is a user logon.
  const [isLogon, setIsLogon] = useState(true);

  /**
   * Handles when user clicks the Logout button.
   * Note: Logout button only appears if isLogin === true
   * @param {*} event Param passed from the button's onClick
   */
  const handleLogoutClick = (event) => {

  };

  /**
   * Handles when user clicks the Signup Chip.
   * Note: Signup button only appears if isLogin === false
   * @param {*} event Param passed from the button's onClick
   */
  const handleSignupClick = (event) => {

  };

  /**
   * Handles when user clicks the Login button.
   * Note: Login button only appears if isLogin === false
   * @param {*} event Param passed from the button's onClick
   */
  const handleLoginClick = (event) => {

  };

  return (
    <Box className={classes.root}>
      <Link to="/">
        <img className="header__logo" 
          src="https://media.istockphoto.com/vectors/green-recycling-logo-vector-id1097223620" alt="icon"></img>
      </Link>
      <UserCard name={user[0].fullname} role={user[0].username} />
      <List>
        {navList.map(nav => (
          <ListItem 
            className={activeTab === nav['label'] ? classes.navItemActive : classes.navItem} 
            button component={Link} 
            to={nav['path']}
            onClick={() => setActiveTab(nav['label'])}
          >
            {nav['label']}
          </ListItem>
        ))}
      </List>

      <Box className={classes.loginButArea}>
        {isLogon ? (
          <Button variant="outlined" color="primary" style={{fontWeight: 600}} onClick={handleLogoutClick}>Logout</Button>
        ) : (
          <>
            <Button variant="contained" color="primary" onClick={handleLoginClick}>Login</Button>
            <span className={classes.signupArea}>
              Not registered? <Chip variant="outlined" color="primary" size="small" label="Sign up" onClick={handleSignupClick}/>
            </span>
          </>
        )}
      </Box>
    </Box>
  );
}

export default NavBar;
