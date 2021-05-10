import React, { useEffect, useState } from 'react';
import { Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

import { makeStyles } from '@material-ui/core';
import { CounterDisposer } from '@amcharts/amcharts4/core';

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: 'none',
        width: 'inherit',
        paddingLeft: '0px',
    }
}));

const Suggestion = () => {
    const classes = useStyles();

    const createData = (name, symbol, price, volume) => {
        return {name, symbol, price, volume};
    };
    const [dataArray, setDataArray] = useState([]);
    const [stockList, setStockList] = useState([]);
    const [rows, setRows] = useState([
        createData("Apple", "AAPL", 132.54, 132893955),
        createData("Tesla", "TSLA", 684.90, 28633353),
        createData("Netflix", "NFLX", 509.11, 4254237),
        createData("Facebook", "FB", 322.58, 10069560),
        createData("GameStop", "GME", 162.20, 3973105),
    ]);

    const getVolume = async (stock) => {
        const request = {
            "stock": stock
        };
        const result = await axios.post('http://localhost:8000/api/stock/volume', request);
        const data = result.data;
        return data[stock];
    }

    const getStockName = async (stock) => {
        const data = {
            "stock": stock
        }
        const result = await axios.post("http://localhost:8000/api/stock/stockName", data);
        return result["name"];
    }
    
    //to retrieve 20 top mentioned stocks
    useEffect(() => {
        const dataFetch = async () => {
            const topList = await axios.get("http://localhost:8000/api/stock/topMentionedWallStreetSub")
            const body = {
                "stock": topList.data
            }
            
            const volumes = await axios.post("http://localhost:8000/api/stock/volume", body);
            const names = await axios.post("http://localhost:8000/api/stock/nameList", body);
            
            setRows(rows => {
                let array = [];
                for(let i = 0; i < topList.data.length; i++) {
                    const code = topList.data[i];
                    const name = names.data[code];
                    const price = 0;
                    const volume = volumes.data[code];
                    array.push(createData(name, code, price, volume));
                }
                return [...array];
            });
        }
        dataFetch();
    }, []);        
                

    useEffect(() => {
        const fetchPrice = async () => {
            const stockList = await axios.get("http://localhost:8000/api/stock/topMentionedWallStreetSub");
            const jsonList = {list: stockList.data};
            const result = await axios.post("http://localhost:8000/api/price/stockPrice", jsonList);
            if(result.data) {
                const stockList = result.data;
                // console.log(stockList["AAPL"])
                setRows(data => {
                    for(let i = 0; i < data.length; i++) {
                        data[i]["price"] = parseFloat(stockList[data[i]["symbol"]]).toFixed(3);
                    }
                    return [...data];
                });
            }
        };
        setInterval(fetchPrice, 2000);
    }, [])

    return (
        <div>
            <TableContainer className={classes.root} component={Paper}>
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