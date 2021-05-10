import pymongo
from bs4 import BeautifulSoup
import requests
import json
myclient = pymongo.MongoClient("mongodb+srv://hieu:Hieu1234@cluster0.uuizv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
mydb = myclient["CSDS393"]
mycol = mydb['Volume']
myTop = mydb['wallstreetsFrequency']

stockList = myTop.aggregate([
            {'$sort': {'day': -1}},
            {'$limit': 25}])

symbols = ''
for i in stockList:
    symbols = symbols + i["_id"] + ','
print(symbols)
all = mycol.find({})
for i in all:
    print(i)
print(set(["AAPL", "FB", "GME", "NFLX", "AMZN","TSLA","MSFT", "MVIS", "GME", "TSLA", "NOK", "AAPL", "AMC", "AMZN", "AMD", "NIO", "OCGN", "ATH", "FB", "INO", "VIAC", "EV", "MSFT", "BB", "EOD", "PM", "TLRY"]))
# x = requests.get('http://api.marketstack.com/v1/intraday/latest?access_key=1a092d0c90b20959044439717e12d1be&symbols=' + symbols)
# data = json.loads(x.content)
# stockData = data["data"]
# insert_data = []
# for stock in stockData:
#     doc = {}
#     doc["_id"] = stock["symbol"]
#     doc["volume"] = stock["volume"]
#     insert_data.append(doc)
# print(insert_data)
#
# mycol.insert_many(insert_data)
# print(mycol.find_one({"username" : "hieunct2001", "watchlist.stock" : "AMZN"},
#                      {"$set": {"watchlist.$.quantity" : 20}}))
# print(mycol.find_one({"watchlist": {"$elemMatch": {"stock": "AMZN"}}}))
# content = requests.get("https://finance.yahoo.com/news/amazon-pretty-big-split-dow-162648325.html")
# soup = BeautifulSoup(content.content, 'html.parser')
# print(soup)