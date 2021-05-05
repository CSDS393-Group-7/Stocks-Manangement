import pymongo
from bs4 import BeautifulSoup
import requests
import json
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["CSDS393"]
mycol = mydb['StockInfo']

x = requests.get('https://api.iextrading.com/1.0/ref-data/symbols/')
data = json.loads(x.content)


# print(mycol.find_one({"username" : "hieunct2001", "watchlist.stock" : "AMZN"},
#                      {"$set": {"watchlist.$.quantity" : 20}}))
# print(mycol.find_one({"watchlist": {"$elemMatch": {"stock": "AMZN"}}}))
# content = requests.get("https://finance.yahoo.com/news/amazon-pretty-big-split-dow-162648325.html")
# soup = BeautifulSoup(content.content, 'html.parser')
# print(soup)