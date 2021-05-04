import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import { Paper, CardHeader, TextField } from '@material-ui/core';
import "../css/StockManagement.css";
import {useSelector} from "react-redux";
import axios from 'axios';

const StockManagement = () => {
    const BASE_URI = "http://localhost:8000";
    const columns = ["Stock Code", "Quantity purchased", "Price purchased", "Current Price", "Total Return"];

    const [data, setData] = useState([]);

    const options = {
        filterType: 'checkbox',
    };

    const token = useSelector(state => state.token);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const [NameInput, setNameInput] = useState('');
    const [QuantityInput, setQuantityInput] = useState('');
    const [PriceInput, setPriceInput] = useState('');

    const digit = /^[+-]?\d+(\.\d+)?$/;
    const spc = /[ `!@#$%^&*()_+\-=\[\]{};'"\\|,<>\/?~]/;

    const handleAdd = async e => {
        e.preventDefault();
        if (NameInput == '' || QuantityInput == '') {
            alert("You cannot leave required fields blank");
        }
        else if (digit.test(PriceInput) == false || digit.test(QuantityInput) == false) {
            alert("You cannot have digits in quantity and price");
        }
        else if (spc.test(NameInput) == true || spc.test(PriceInput) == true || spc.test(QuantityInput) == true) {
            alert("You cannot have special characters");
        }
        else {
            const result = await sendToBackend();
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
            setNameInput('');
            setQuantityInput('');
            setPriceInput('');
        }
    }
    
    const sendToBackend = async () => {
        const data = {
          stock: NameInput,
          quantity: parseFloat(QuantityInput),
          price: parseFloat(PriceInput)
        }
        
        const result = await axios.post(BASE_URI + "/api/stock/addStock", data, config)
        return result
    }
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
            const result = await axios.get(BASE_URI + "/api/user/watchList", config);
            
            if(result.data) {
                const stockList = convertDataToArray(result.data);
                
                setData(stockList);
            }
        };

        const fetchPrice = async () => {
            const query = await axios.get(BASE_URI + "/api/user/watchList", config);
            const stockList = query.data
            const listToSend = stockList.map(stock => stock.stock);
            const jsonList = {list: listToSend};
            if(listToSend.length !== 0) {
                const result = await axios.post(BASE_URI + "/api/price/stockPrice", jsonList);
                if(result.data) {
                    const stockList = result.data;
                    setData(data => {
                        for(let i = 0; i < data.length; i++) {
                            const totalReturn = parseFloat(data[i][3]) * parseFloat(data[i][1]) - parseFloat(data[i][2]) * parseFloat(data[i][1]);
                            data[i][3] = parseFloat(stockList[data[i][0]]).toFixed(3);
                            data[i][4] = totalReturn.toFixed(3);
                        }
                        return [...data];
                    });
                }
            }
        };
        fetchData()
        .then(() => setInterval(fetchPrice, 2000));
    }, [])

    return (
        <>
            <Paper>
                <CardHeader title="Add New Stock" />
                <form className="stock__input">
                    <div className="stock__question">
                        <h4 className="required name">Name</h4>
                        <TextField
                            value={NameInput}
                            onChange={e => setNameInput(e.target.value)}
                            className="stock__inputField"
                        ></TextField>
                    </div>
                    <div className="stock__question">
                        <h4 className="required name">Quantity purchased</h4>
                        <TextField
                            value={QuantityInput}
                            onChange={e => setQuantityInput(e.target.value)}
                            className="stock__inputField"
                        ></TextField>
                    </div>
                    <div className="stock__question">
                        <h4 className="name">Price purchased</h4>
                        <TextField
                            value={PriceInput}
                            onChange={e => setPriceInput(e.target.value)}
                            className="stock__inputField"
                        ></TextField>
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