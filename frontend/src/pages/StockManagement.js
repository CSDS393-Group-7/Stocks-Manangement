import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import MUIDataTable from "mui-datatables";
import { Paper, CardHeader } from '@material-ui/core';
import "../css/StockManagement.css";

const StockManagement = () => {
    const columns = ["Stock Name", "Stock Code", "Total Return", "Quantity purchased", "Price purchased", "Market Cap"];

    const [data, setData] = useState([
        ["BINANCE:ETHUSDT", "ETH", 24, 4.0, 4.0, 4.0],
        ["Apple", "AAPL", 24, 4.0, 4.0, 4.0],
        ["Vietnam Airlines", "VNA", 45, 5.0, 6.0, 4.0],
        ["Tesla", "TSL", 44, 6.5, 4.0, 7.0],
    ]);

    const options = {
        filterType: 'checkbox',
    };

    const [NameInput, setNameInput] = useState('');
    const [QuantityInput, setQuantityInput] = useState('');
    const [PriceInput, setPriceInput] = useState('');
   
    const handleAdd = e => {
        e.preventDefault();
        if (NameInput == '' || QuantityInput == '') {
            alert("You cannot leave required fields blank");
        }
        else {
            setData([... data, [NameInput, "Code", 0, QuantityInput, PriceInput, 0]]);
            setNameInput('');
            setQuantityInput('');
            setPriceInput('');
        }
    }
     
    useEffect(() => {
        const socket = io('localhost:3080');
        socket.on("change-type", (event) => {
            const data = event
            if (data !== undefined) {
                setData(row => {
                    for(let i = 0; i < row.length; i++) {
                        if(row[i][0] === data["stock"]){
                            row[i][5] = data["price"];
                            // total return = marketcap * quantity - boughtPrice * quantity
                            row[i][2] = row[i][5] * [row][i][3] - row[i][5] * row[i][3]
                            return [...row];
                        }
                    }
                    return [...row];
                }) 
            }
        }) 
    }, [])

    return (
        <>
            <Paper>
                <CardHeader title="Add New Stock" />
                <form className="stock__input">
                    <div className="stock__question">
                        <h4 className="required">Name</h4>
                        <input
                            value={NameInput}
                            onChange={e => setNameInput(e.target.value)}
                            className="stock__inputField"
                            placeholder="Stock name"
                            type='text'
                        ></input>
                    </div>
                    <div className="stock__question">
                        <h4 className="required">Quantity purchased</h4>
                        <input
                            value={QuantityInput}
                            onChange={e => setQuantityInput(e.target.value)}
                            className="stock__inputField"
                            placeholder="Quantity purchased"
                            type='text'
                        ></input>
                    </div>
                    <div className="stock__question">
                        <h4>Purchased price</h4>
                        <input
                            value={PriceInput}
                            onChange={e => setPriceInput(e.target.value)}
                            className="stock__inputField"
                            placeholder="Purchased price"
                            type='text'
                        ></input>
                        </div>
                    <button onClick={handleAdd} type="submit" className="stock__inputButton">Add</button>
            </form>
            </Paper>
            <Paper className="stock__table">
                <MUIDataTable 
                    title={"Stock Management Table"} 
                    data={data} 
                    columns={columns} 
                    options={options} 
                />
            </Paper>
        </>
    );
};

export default StockManagement;