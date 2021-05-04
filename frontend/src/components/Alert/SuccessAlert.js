import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

/**
 * Success Alert
 * @param {JSX | string}  message   The success message
 * @param {boolean}       open      Whether the alert shows
 * @param {Function}      onClose   Takes in <pre>event</pre> and <pre>reason</pre>. 
 * @returns 
 */
function SuccessAlert({ message, open, onClose }) {
  return (
    <Snackbar 
      open={open} 
      onClose={onClose}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
    >
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );  
}

export default SuccessAlert;