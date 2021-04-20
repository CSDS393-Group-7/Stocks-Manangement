import schedule
import time
import os

print('Scheduler initialised')
# schedule.every(1).minutes.do(lambda: os.system('scrapy crawl stock'))
# print('Next job is set to run at: ' + str(schedule.next_run()))

while True:
    # schedule.run_pending()
    # os.system('scrapy crawl stock')
    # print('Next job is set to run at: ' + str(schedule.next_run()))
    os.system('scrapy crawl stock')
    time.sleep(5)
