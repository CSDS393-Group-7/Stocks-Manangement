import React, { useState, useEffect } from 'react';
import "../../css/Header.css";
import { Link, useHistory } from 'react-router-dom';
import UserCard from './UserCard';
import { Box, Button, Chip, List, ListItem, ListItemIcon, makeStyles } from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { useDispatch, useSelector } from 'react-redux';
import {saveToken, setUser} from "../../store/user/user";

const useStyles = makeStyles(theme => ({
  root: {
    width: '250px',
    minWidth: '250px',
    borderRight: '1px solid rgba(145, 158, 171, 0.24)',
    height: '100vh',
    top: 0,
    position: 'sticky',
  },
  navItem: {
    paddingLeft: '35px',
    height: '45px',
  },
  navItemActive: {
    paddingLeft: '35px',
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
  navItemIcon: {
    minWidth: '40px',
  },
  loginButArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  signupArea: {
    marginTop: '10px',
  },
}));

function NavBar() {
  const classes = useStyles();

  const token = useSelector(state => state.token);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [activeTab, setActiveTab] = useState("Home");

  useEffect(() => {
    if (token != null) {
      setIsLogin(true);
    }
  }, [token])

  const navList = [
    {
      label: 'Home',
      path: '/home',
      icon: (<HomeIcon color={activeTab === 'Home' ? 'primary' : 'default'}/>),
    },
    {
      label: 'Stock Management',
      path: '/stockmanagement',
      icon: (<MonetizationOnIcon color={activeTab === 'Stock Management' ? 'primary' : 'default'} />),
    },
  ];

  // Tracks if there is a user login.
  const [isLogin, setIsLogin] = useState(false);

  /**
   * Handles when user clicks the Logout button.
   * Note: Logout button only appears if isLogin === true
   * @param {*} event Param passed from the button's onClick
   */
  const handleLogoutClick = (event) => {
    dispatch(saveToken(null));
    setIsLogin(false);
    dispatch(setUser({
      username: "Your username",
      fullname: "Your full name",
      email: "Your email"
    }));
    localStorage.removeItem("persist:root");
  };

  /**
   * Handles when user clicks the Signup Chip.
   * Note: Signup button only appears if isLogin === false
   * @param {*} event Param passed from the button's onClick
   */
  const handleSignupClick = (event) => {
      history.push("/signup");
  };

  /**
   * Handles when user clicks the Login button.
   * Note: Login button only appears if isLogin === false
   * @param {*} event Param passed from the button's onClick
   */
  const handleLoginClick = (event) => {
    history.push("/login");
  };

  return (
    <Box className={classes.root}>
      <Link to="/">
        <img className="header__logo" 
          src="https://seeklogo.com/images/C/closingbell-logo-DEDE313D68-seeklogo.com.gif" alt="icon"></img>
      </Link>
      {console.log(user)}
      {<UserCard name={user[0].fullname} role={user[0].username} />}
      <List>
        {navList.map(nav => (
          <ListItem 
            className={activeTab === nav['label'] ? classes.navItemActive : classes.navItem} 
            button component={Link} 
            to={nav['path']}
            onClick={() => setActiveTab(nav['label'])}
          >
            <ListItemIcon className={classes.navItemIcon}>
              {nav['icon']}
            </ListItemIcon>
            {nav['label']}
          </ListItem>
        ))}
      </List>

      <Box className={classes.loginButArea}>
        {isLogin ? (
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
