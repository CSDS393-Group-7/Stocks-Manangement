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

export default function Page403() {
    const classes = useStyles();

    return (
        <Result
            className={classes.root}
            status="403"
            title={<div className={classes.title}>- &nbsp; 403 Forbidden &nbsp; -</div>}
            subTitle={<span>You must log in first! &#128533;</span>}
        />
    )
}
