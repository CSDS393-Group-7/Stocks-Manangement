import pymongo
from pymongo import MongoClient
myclient = pymongo.MongoClient("mongodb://localhost:27017/")

mydb = myclient["CSDS393"]
db_list = mydb.list_collections()
print(db_list)
for db in db_list:
    mycol = mydb[db['name']]
    queries = mycol.aggregate([
        {'$sort': {'day': -1}},
        {'$limit': 20}])
    print(db['name'])
    for query in queries:
        print(query)
    print()
# for stock in stock_list:
#     data = {
#         "stock": stock,
#         "day": 0,
#         "week":0,
#         "3week":0,
#         "month":0,
#         "year":0
#     }
# mycol.insert()