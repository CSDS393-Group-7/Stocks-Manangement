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
}



module.exports = Price

