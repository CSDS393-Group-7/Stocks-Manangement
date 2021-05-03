import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
const InputDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [quantity, setQuantity] = React.useState(0);
  const [purchased, setPurchased] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = {
      stock: name,
      quantity: quantity,
      purchased: purchased
    }
    const token = localStorage.getItem("jwt");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios.post("http://localhost:8000/api/stock/addStock", data, config).then((res) => {
      props.addToTable(res.data)
    });
    setOpen(false);
  }
  
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add New Order
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the information for your order
          </DialogContentText>
          <TextField
            autoFocus
            onChange={e => setName(e.target.value)}
            margin="dense"
            id="stock"
            label="Stock Name"
            type="stock"
            fullWidth
          />
          <TextField
            autoFocus
            onChange={e => setQuantity(parseFloat(e.target.value))}
            margin="dense"
            id="quantity"
            label="Quantity"
            type="quantity"
            fullWidth
          />
          <TextField
            autoFocus
            onChange={e => setPurchased(parseFloat(e.target.value))}
            margin="dense"
            id="price"
            label="Price purchased"
            type="price"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default InputDialog;