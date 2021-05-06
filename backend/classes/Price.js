'use strict'

require('dotenv').config();

const db = require('../database');

class Price {
    static async startSocket (socketServer, db) {
        const io = require('socket.io')(socketServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });
        
        io.on("connection", async (socket) => {
            console.log(socket.id + " :connected")
            socket.on("disconnect", function() {
                console.log(socket.id + ": disconnected");
            });
            
            const priceCol = db.collection("Price");
            const changeStream = await priceCol.watch()
            changeStream.on('change', (change) => {
                const type = change.operationType;
                if (type == "update" && change.updateDescription.updatedFields !== undefined) {
                    priceCol.findOne(change.documentKey)
                        .then((res) => {
                            io.emit("change-type", res)
                        })
                }
            })
        })
    }

    static async getStockPrice(list) {
        let result = {};
        for(const stock of list) {
            const query = await db.collection("Price").findOne({stock: stock});
            delete query['_id'];
            result[query["stock"]] = query["price"];
        }
        return result;
    }

    static async getSpecificStockPrice(code) {
        const price = await db.collection("Price").findOne({stock: code});
        return price["price"];
    }
}

module.exports = Price

