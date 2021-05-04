import React, { useEffect, useState } from 'react';
import { Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { io } from "socket.io-client"

const GeneralWatchlist = () => {
    const [input, setInput] = useState([]);

    const createData = (name, code, price, marketcap, volume) => {
        return {name, code, price, marketcap, volume};
    };


    const [rows, setRows] = useState([
        createData("Apple", "AAPL", 24, 4.0),
        createData("Tesla", "TSL", 37, 4.3),
        createData("Vietcombank", "VNA", 24, 6.0),
        createData("Faccebook", "FB", 67, 4.3),
        createData("Vietnam Airlines", "VNA", 49, 3.9),
    ]);

    

    const json2array = (json) => {
        var result = [];
        var keys = Object.keys(json);
        keys.forEach(function(key){
            result.push(json[key]);
        });
        result.push(0);
        result.push(0);
        return result;
    }

    const convertDataToArray = (data) => {
        let result = [];
        for(let i = 0; i < data.length; i++) {
            const stock = json2array(data[i]);
            result.push(stock);
        }
        return result;
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("http://localhost:8000/stock/topMentionedStocksSub", config);
            if(result.data) {
                const stockList = convertDataToArray(result.data);
                setData(stockList);
            }
        }
        console.log("fetched");
        fetchData();
    }, [])


    const handleAdd = async e => {
        e.preventDefault();

            const result = await axios.get("http://localhost:8000/stock/topMentionedStocksSub", config);
           
            console.log(result.data)
            setData(data => {
                const newInput = result.data;
                for(let i = 0; i < data.length; i++) {
                    const stockName = data[i][0];
                    if(stockName === newInput["stock"]) {
                        data[i] = json2array(newInput);
                        return data;
                    }
                }
                return [... data, [NameInput, QuantityInput, PriceInput, 0, 0]];
            });

        
    }


    useEffect(() => {
        const socket = io('localhost:3000');
        socket.on("change-type", (event) => {
            const data = event
            if (data !== undefined) {
                setRows(rows => {
                    for(let i = 0; i < rows.length; i++) {
                        if(rows[i].name === data["stock"]) {
                            rows[i].price = data["price"];
                            rows[i].marketcap = data["marketcap"];
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

export default GeneralWatchlist;