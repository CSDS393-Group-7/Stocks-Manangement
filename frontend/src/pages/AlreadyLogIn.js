import React from 'react';
import { Result } from 'antd';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center',
    },
    title: {
        fontSize: '25px',
        fontWeight: 700,
        marginTop: '20px',
    },
}));


export default function AlreadyLoggedIn() {
    const classes = useStyles();
    
    return (
        <Result
            className={classes.root}
            // className="app-result-page"
            status="500"
            title={<div className={classes.title}>- 500 -</div>}
            subTitle={<span>You already logged in! You might want to log out first.</span>}
        />
    )
}