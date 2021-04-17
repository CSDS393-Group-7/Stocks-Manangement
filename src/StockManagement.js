import React, { useState } from 'react';
import "./StockManagement.css";
import { Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const StockManagement = () => {
    const [input, setInput] = useState([]);

    const createData = (id, name, code, price, change) => {
        return { id, name, code, price, change};
    };
      
    const [rows, setRows] = useState([
        createData(1, "Apple", "AAPL", 24, 4.0),
        createData(2, "Tesla", "TSL", 37, 4.3),
        createData(3, "Vietcombank", "VNA", 24, 6.0),
        createData(4, "Faccebook", "FB", 67, 4.3),
        createData(5, "Vietnam Airlines", "VNA", 49, 3.9),
    ]);

    const handleAdd = e => {
        e.preventDefault();
        setRows([...rows, createData(rows.length + 1, input, "Code", 0, 0)]);
        setInput('');
    }
      
    

    return (
        <div>
            <h1>Stock Management Table</h1>
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">ID</TableCell>
                    <TableCell align="right">Code</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Change</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{row.id}</TableCell>
                    <TableCell align="right">{row.code}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.change}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            <form className="stock__input">
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        className="stock__inputField"
                        placeholder="Add new stock"
                        type='text'
                    ></input>
                    <button onClick={handleAdd} type="submit" className="stock__inputButton">Add</button>
            </form>
        </div>
    );
};

export default StockManagement;