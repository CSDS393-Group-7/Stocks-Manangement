import pymongo 

def get_all():
    db = pymongo.MongoClient('mongodb://localhost:27017')["StockApp"]["Transactions"]
    current_stocks = []
    cursor = db.find({}, {"Stock Name": 1})
    for record in cursor:
        current_stocks.append(record["Stock Name"])
    return current_stocks

