import websocket
import json
import pymongo

stocks = ["AAPL", "AMZN", "BINANCE:BTCUSDT","BINANCE:ETHUSDT", "BINANCE:RVNUSDT", "BINANCE:ETCUSDT"]
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["StockPrice"]
mycol = mydb['Price']
def on_message(ws, message):
    try:
        if json.loads(message)['type'] != 'ping':
            price = json.loads(message)['data'][0]['p']
            name = json.loads(message)['data'][0]['s']
            if mycol.find_one_and_update({'stock': name}, {'$set': {'price':price}}) == None:
                mycol.insert_one({
                    'stock': name,
                    'price': price
                })
                print((price, name))
        else:
            print(json.loads(message)['type'])
    except Exception as e:
        print("Exception occurs")

def on_error(ws, error):
    print(error)

def on_close(ws):
    print("### closed ###")

def on_open(ws):
    for stock in stocks:
        ws.send('{"type":"subscribe","symbol":"%s"}'%(stock))

if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("wss://ws.finnhub.io?token=c0ao2gv48v6sc0grn8j0",
                              on_message = on_message,
                              on_error = on_error,
                              on_close = on_close)
    ws.on_open = on_open
    # ws.send('{"type":"subscribe","symbol":"%s"}' % ('MSFT'))
    ws.run_forever()
