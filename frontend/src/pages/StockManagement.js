import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import { Paper, CardHeader, TextField, Button, makeStyles, InputAdornment } from '@material-ui/core';
import "../css/StockManagement.css";
import {useSelector} from "react-redux";
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    addButton: {
        display: 'grid',
        margin: '15px auto 0px',
    },
    addStockTitle: {
        ...theme.typography.h5,
        // borderLeft: '2px solid black',
        // paddingLeft: '10px'
    }
}));

const StockManagement = () => {
    const classes = useStyles();

    const BASE_URI = "http://localhost:8000";
    const columns = ["Stock Code", "Quantity purchased", "Price purchased", "Current Price", "Total Return"];

    const [data, setData] = useState([]);

    const options = {
        filterType: 'checkbox',
        selectableRows: 'none',
    };

    const token = useSelector(state => state.token);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const [NameInput, setNameInput] = useState('');
    const [QuantityInput, setQuantityInput] = useState('');
    const [PriceInput, setPriceInput] = useState('');

    const digit = /^[+-]?\d+(\.\d+)?$/;
    const spc = /[`!@#$%^&*()_+\-=\[\]{};'"\\|,<>\/?~]/;

    const handleAdd = async e => {
        e.preventDefault();
        if (NameInput == '' || QuantityInput == '') {
            alert("You cannot leave required fields blank");
        }
        else if (digit.test(QuantityInput) == false) {
            alert("You cannot have digits in quantity and price");
        }
        else if (spc.test(NameInput) == true || spc.test(PriceInput) == true || spc.test(QuantityInput) == true) {
            alert("You cannot have special characters");
        }
        else {
            const result = await sendToBackend();
            // const currentPrice = await getCurrentStockPrice();
            setData((data) => {
                const newInput = result.data;
                for(let i = 0; i < data.length; i++) {
                    const stockName = data[i][0];
                    if(stockName === newInput["stock"]) {
                        data[i] = json2array(newInput);
                        return data;
                    }
                }
                // if(PriceInput) {
                    return [... data, [NameInput, QuantityInput, PriceInput, 0, 0]];
                // }
                // else {
                //     return [... data, [NameInput, QuantityInput, currentPrice, 0, 0]];
                // }
            });
            setNameInput('');
            setQuantityInput('');
            setPriceInput('');
        }
    }
    
    const getCurrentStockPrice = async (code) => {
        const data = await axios.post(BASE_URI + "/api/price/specificStockPrice", {stock: code});
        return data.data["price"];
    }

    const sendToBackend = async () => {
        if(PriceInput) {
            const data = {
                stock: NameInput,
                quantity: parseFloat(QuantityInput),
                price: parseFloat(PriceInput)
            };
              
            const result = await axios.post(BASE_URI + "/api/stock/addStock", data, config);
            return result;
        }
        else {
            const currentPrice = await getCurrentStockPrice(NameInput)
            const data = {
                stock: NameInput,
                quantity: parseFloat(QuantityInput),
                price: currentPrice
            };
              
            const result = await axios.post(BASE_URI + "/api/stock/addStock", data, config);
            // setPriceInput(currentPrice);
            return result;
        }
    }
    const json2array = (json) => {
        var result = [];
        var keys = Object.keys(json);
        keys.forEach(function(key){
            if(parseFloat(json[key])) {
                if(parseFloat(json[key]) % 1 == 0) {
                    const twoDecimal = parseFloat(json[key]).toFixed(2);
                    result.push(twoDecimal);
                }
                else {
                    const threeDecimal = parseFloat(json[key]).toFixed(3);
                    result.push(threeDecimal);
                }
            }
            else {
                result.push(json[key]);
            }
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
                <CardHeader title="Add New Stock" titleTypographyProps={{className: classes.addStockTitle}} />
                <form className="stock__input">
                    <div className="stock__question">
                        <h4 className="required name">Name</h4>
                        <TextField
                            value={NameInput}
                            onChange={e => setNameInput(e.target.value.toUpperCase())}
                            className="stock__inputField"
                        />
                    </div>
                    <div className="stock__question">
                        <h4 className="required name">Quantity purchased</h4>
                        <TextField
                            value={QuantityInput}
                            onChange={e => setQuantityInput(e.target.value)}
                            className="stock__inputField"
                        />
                    </div>
                    <div className="stock__question">
                        <h4 className="name">Price purchased</h4>
                        <TextField
                            value={PriceInput}
                            onChange={e => setPriceInput(e.target.value)}
                            InputProps={{startAdornment: <InputAdornment>$</InputAdornment>}}
                            className="stock__inputField"
                        />
                    </div>

                    <Button className={classes.addButton} onClick={handleAdd} type="submit" variant="outlined" color="primary">Add</Button>
            </form>
            </Paper>
            <MUIDataTable 
                className="stock__table"
                title={<CardHeader title="Stock Management Table" titleTypographyProps={{className: classes.addStockTitle}} />}
                data={data} 
                columns={columns} 
                options={options} 
            />
        </>
    );
};

export default StockManagement;