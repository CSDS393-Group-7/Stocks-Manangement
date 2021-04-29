import React, { useState } from 'react';

import { Box, List, ListItem, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import UserCard from './NavBar/UserCard';

const useStyles = makeStyles(theme => ({
  root: {
    width: '280px',
    minWidth: '280px',
    borderRight: '1px solid rgba(145, 158, 171, 0.24)',
    paddingTop: '20px'
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
      path: '/home',
    },
    {
      label: 'Login',
      path: '/login',
    },
    {
      label: 'Register',
      path: '/signup',
    },
  ]

  return (
    <Box className={classes.root}>
      <Link to="/">
        <img className="header__logo" 
          src="https://thumbs.dreamstime.com/b/growth-chart-infographic-chart-icon-white-icon-dark-background-growth-chart-infographic-chart-icon-white-icon-dark-156695206.jpg" alt="icon"></img>
      </Link>
      <UserCard name="7 Mieng Dat" role="admin" />
      <List>
        {navList.map(nav => (
          <ListItem className={activeTab === nav['label'] ? classes.navItemActive : classes.navItem} button component={Link} to={nav['path']}>
            {nav['label']}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default NavBar;