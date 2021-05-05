import React, { useEffect, useState } from 'react';
import { Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { io } from "socket.io-client"
import axios from 'axios';

const Suggestion = () => {
    const createData = (name, symbol, price, volume) => {
        return {name, symbol, price, volume};
    };
    const [dataArray, setDataArray] = useState([]);
  



    var names = [];

  
    //to retrieve 20 top mentioned stocks
    useEffect(() => {
        fetch("http://localhost:8000/api/stock/topMentionedStocksSub")
        .then((response) => response.json())
        .then((data) => {
            const dataFetch = Object.entries(data);
    
            for(let i = 0; i < 20; i++) {
                const stockInfo = dataFetch[i][1];
                const name = stockInfo["_id"];      
                names.push(name);
            }
        })
    }, []);        
                


    const [rows, setRows] = useState([
        createData("Apple", "AAPL", 132.54, 132893955),
        createData("Tesla", "TSL", 684.90, 28633353),
        createData("Netflix", "NFLX", 509.11, 4254237),
        createData("Facebook", "FB", 322.58, 10069560),
        createData("GameStop", "GME", 162.20, 3973105),
    ]);



      
    useEffect(() => {
        const socket = io('localhost:3001');
        socket.on("change-type", (event) => {
            const data = event
            if (data !== undefined) {
                setRows(rows => {
                    for(let i = 0; i < rows.length; i++) {
                        if(rows[i].name === data["stock"]) {
                            rows[i].price = data["price"];
                            rows[i].volume = data["volume"];

                            return [...rows]
                        }
                    }
                    return [...rows]
                })
            }
        })
        
    }, [])



    return (
        <div>
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Symbol</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Volume</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
        
                    <TableCell align="right">{row.symbol}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.volume}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )

}

    /*

    return (
        <div className="container">
            <h2> General Watchlist </h2>

            
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Code</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Market Cap</TableCell>
                    <TableCell align="right">Volume</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
        
                    <TableCell align="right">{row.code}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.marketcap}</TableCell>
                    <TableCell align="right">{row.volume}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

        </div>
    );
};

*/

export default Suggestion;