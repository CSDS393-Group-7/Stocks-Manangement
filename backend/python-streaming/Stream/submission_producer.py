import praw
import re
import sys
from kafka import KafkaProducer

def publish_message(producer_instance, topic_name, partition, key, value):
    try:
        key_bytes = bytes(key, encoding='utf-8')
        value_bytes = bytes(value, encoding='utf-8')
        producer_instance.send(topic_name, partition=partition, key=key_bytes, value=value_bytes)
        producer_instance.flush()
        print('Message published successfully.')
    except Exception as ex:
        print('Exception in publishing message')
        print(str(ex))

def connect_kafka_producer():
    _producer = None
    try:
        _producer = KafkaProducer(bootstrap_servers=['localhost:9092'], api_version=(0, 10))
    except Exception as ex:
        print('Exception while connecting Kafka')
        print(str(ex))
    finally:
        return _producer


def remove_emoji(comment):
    emoji_pattern = re.compile("["
                               u"\U0001F600-\U0001F64F"  # emoticons
                               u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                               u"\U0001F680-\U0001F6FF"  # transport & map symbols
                               u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                               u"\U0001f900-\U0001f999"
                               u"\U00002702-\U00002f7B"
                               u"\U000024C2-\U0001F251"
                               u"\u00f0-\u99f0"
                               "]+", flags=re.UNICODE)

    cleaned_comment = emoji_pattern.sub(r'', comment)
    return cleaned_comment

if len(sys.argv) >= 2:
    try:
        kafka_producer = connect_kafka_producer()
        r = praw.Reddit('bot1')
        num_comments_collected = 0
        # build stream. add first subreddit to start.
        subreddits = sys.argv[1]
        for sr in sys.argv[2:len(sys.argv) - 1]:
            subreddits = subreddits + "+" + sr
        print(subreddits)
        post_stream = r.subreddit(subreddits)
        # for comment in comment_stream.stream.comments(skip_existing=True):
        args_length = len(sys.argv)
        for post in post_stream.stream.submissions():
            publish_message(kafka_producer, 'reddit_news', int(sys.argv[args_length - 1]), 'news', remove_emoji(str(post.selftext)))
        if kafka_producer is not None:
            kafka_producer.close()
    except Exception as e:
        print(e)
else:
    print("please enter subreddit.")
