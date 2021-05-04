import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { AlertTitle } from '@material-ui/lab';

/**
 * Success Alert
 * @param {JSX | string}  message   The error message
 * @param {boolean}       open      Whether the alert shows
 * @param {Function}      onClose   Takes in <pre>event</pre> and <pre>reason</pre>. 
 * @returns 
 */
function ErrorAlert({ message, open, onClose }) {
  return (
    <Snackbar 
      open={open} 
      onClose={onClose}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
    >
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );  
}

export default ErrorAlert;