import React, { useEffect, useState } from 'react';
import "./StockManagement.css";
import { io } from "socket.io-client";
import MUIDataTable from "mui-datatables";

const StockManagement = () => {
    const columns = ["Stock Name", "Stock Code", "Total Return", "Quantity purchased", "Price purchased", "Market Cap"];

    const [data, setData] = useState([
        ["Apple", "AAPL", 24, 4.0, 4.0, 4.0],
        ["Apple", "AAPL", 24, 4.0, 4.0, 4.0],
        ["Apple", "AAPL", 24, 4.0, 4.0, 4.0],
        ["Apple", "AAPL", 24, 4.0, 4.0, 4.0],
    ]);

    const options = {
        filterType: 'checkbox',
    };


    const [input, setInput] = useState([]);
   
    const handleAdd = e => {
        e.preventDefault();
        setData([... data, [input, "Code", 0, 0, 0, 0]]);
        setInput('');
        console.log(data[0][1])
    }
     
    useEffect(() => {
        const socket = io('localhost:8080');
        socket.on("change-type", (event) => {
            const data = event
            if (data !== undefined) {
                setData(row => {
                    for(let i = 0; i < data.length; i++) {
                        if(row[0] === data["stock"]) {
                            let oldPrice = row[4];
                            row[3] = data["price"] - oldPrice;
                            return [...data]
                        }
                    }
                    return [...data]
                }) 
            }
        })
        
    }, [])

    
    return (
        <div>
            <MUIDataTable 
                title={"Stock Management Table"} 
                data={data} 
                columns={columns} 
                options={options} 
            />
    
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