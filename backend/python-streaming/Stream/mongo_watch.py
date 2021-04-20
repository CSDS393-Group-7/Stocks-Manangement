import os
import pymongo
from bson.json_util import dumps
import socket
import json
client = pymongo.MongoClient("mongodb://localhost:27017/CSDS393")
change_stream = client.changestream.collection.watch
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print("Socket successfully created")
port = 12345
server.bind((socket.gethostname(), port))
print("socket binded to %s" % (port))
# put the socket into listening mode
server.listen(5)
print("socket is listening")
# a forever loop until we interrupt it or
# an error occurs
while True:
    # Establish connection with client.
    clientsocket, addr = server.accept()
    print('Got connection from', addr)
    try:
        # Only catch insert operations
        with client.watch([{'$match': {'operationType': 'update'}}]) as stream:
            for insert_change in stream:
                print(insert_change)
                jsonObj = json.dumps(insert_change["updateDescription"])
                # clientsocket.send(bytes(jsonObj, 'utf-8'))
    except pymongo.errors.PyMongoError:
        print('There are some errors')

