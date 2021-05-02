import pymongo
from bs4 import BeautifulSoup
import requests
# myclient = pymongo.MongoClient("mongodb://localhost:27017/")
# mydb = myclient["stock-management"]
# mycol = mydb['user']
# print(mycol.find_one({"username" : "hieunct2001", "watchlist.stock" : "AMZN"},
#                      {"$set": {"watchlist.$.quantity" : 20}}))
# print(mycol.find_one({"watchlist": {"$elemMatch": {"stock": "AMZN"}}}))
# content = requests.get("https://finance.yahoo.com/news/amazon-pretty-big-split-dow-162648325.html")
# soup = BeautifulSoup(content.content, 'html.parser')
# print(soup)