from kafka import KafkaConsumer, TopicPartition
import pymongo
import re
import sys
with open("stocks.txt") as file:
    stock_list = set()
    for stock in file.readlines():
        name = stock.split()[0]
        if len(name) > 1:
            stock_list.add(stock.split()[0])

def connect_kafka_consumer(partition):
    _consumer = None
    try:
        _consumer = KafkaConsumer(
            auto_offset_reset='latest',
            bootstrap_servers=['localhost:9092'], consumer_timeout_ms=1000, api_version=(0, 10),
            key_deserializer=lambda x: x.decode("utf-8"), value_deserializer=lambda x: x.decode("utf-8"))
        tp = TopicPartition('reddit_news', partition)
        _consumer.assign([tp])
    except Exception as ex:
        print('Exception while connecting Kafka')
        print(str(ex))
    finally:
        return _consumer

def filter(comment, db):
    tokenized_comment = re.split('\W+', comment)
    for word in tokenized_comment:
        # print(word)
        if word in stock_list:
            # print(word)
            if db.find_one({"_id": word}) == None:
                db.insert_one(
                    {
                        "_id": word,
                        "day": 1,
                        "week": 1,
                        "3week": 1,
                        "month": 1,
                        "year": 1
                    }
                )
            else:
                db.update_one({"_id": word}, {'$inc': {'day': 1,
                                                          'week': 1,
                                                          '3week': 1,
                                                          'month': 1,
                                                          'year': 1}})
    print("Published in database")
    return tokenized_comment

try:
    arg_length = len(sys.argv)
    myclient = pymongo.MongoClient("mongodb+srv://hieu:Hieu1234@cluster0.uuizv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    mydb = myclient["CSDS393"]
    mycol = mydb[sys.argv[arg_length - 1]]
    print(sys.argv[arg_length - 1])
    kafka_consumer = connect_kafka_consumer(int(sys.argv[arg_length - 2]))
    while True:
        data = kafka_consumer.poll(100.0)
        for tp, comments in data.items():
            for comment in comments:
                # print(comment.value)
                filter(comment.value, mycol)

except Exception as e:
    print("Exception occurs")
    print(str(e))
finally:
    if kafka_consumer != None:
        kafka_consumer.close()
        print("Closed consumer")
    print("Goodbye")