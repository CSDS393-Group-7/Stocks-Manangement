import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import MUIDataTable from "mui-datatables";
import { Paper, CardHeader, TextField } from '@material-ui/core';
import "../css/StockManagement.css";
import axios from 'axios';
import { useSelector } from 'react-redux';
const StockManagement = () => {
    const columns = ["Stock Code", "Quantity purchased", "Price purchased", "Current Price","Total Return"];

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

    const digit = /\D/;
    const spc = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    const handleAdd = async e => {
        e.preventDefault();
        if (NameInput == '' || QuantityInput == '') {
            alert("You cannot leave required fields blank");
        }
        else if (digit.test(PriceInput) == true || digit.test(QuantityInput) == true) {
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
        
        const result = await axios.post("http://localhost:8000/api/stock/addStock", data, config)
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

    // useEffect(() => {
        
    // }, [])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("http://localhost:8000/api/user/watchList", config);
            // const price = await axios.
            if(result.data) {
                const stockList = convertDataToArray(result.data);
                setData(stockList);
            }
        };

        const fetchPrice = async () => {
            const listToSend = data.map(stock => stock[0]);
            // console.log(listToSend, data);
            const jsonList = {list: listToSend};
            if(listToSend.length !== 0) {
                const result = await axios.post("http://localhost:8000/api/price/stockPrice", jsonList);
                if(result.data) {
                    const stockList = result.data;
                    setData(data => {
                        for(let i = 0; i < data.length; i++) {
                            data[i][3] = parseFloat(stockList[data[i][0]]);
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
                        <h4 className="required">Name</h4>
                        <TextField
                            value={NameInput}
                            onChange={e => setNameInput(e.target.value)}
                            className="stock__inputField"
                            type='text'
                        ></TextField>
                    </div>
                    <div className="stock__question">
                        <h4 className="required">Quantity purchased</h4>
                        <TextField
                            value={QuantityInput}
                            onChange={e => setQuantityInput(e.target.value)}
                            className="stock__inputField"
                            type='text'
                        ></TextField>
                    </div>
                    <div className="stock__question">
                        <h4>Purchased price</h4>
                        <TextField
                            value={PriceInput}
                            onChange={e => setPriceInput(e.target.value)}
                            className="stock__inputField"
                            type='text'
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