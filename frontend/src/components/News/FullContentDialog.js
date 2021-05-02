import React, { useEffect, useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

/* This is no longer in use. :) */
function FullContentDialog(props) {
  const [isLoading, setIsLoading] = useState(true);

  const [contentHTML, setContentHTML] = useState(null);

  useEffect(() => {
    if (!props.open)
      return;
  }, [props.open]); 

  return (
    <Dialog
      onClose={props.handleClose}
      open={props.open}
    >
      <DialogContent dividers>
        {isLoading ? (
          <h1>Loading nè</h1>
        ) : (
          contentHTML
        )}
      </DialogContent>
      <DialogActions>
        <Button
          endIcon={<CloseIcon />}
          onClick={props.handleClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
  
};

export default FullContentDialog;