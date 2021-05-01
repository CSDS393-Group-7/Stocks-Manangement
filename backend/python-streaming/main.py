import sys
import os
import subprocess
import threading

class Loader(object):
    def subprocess_cmd(self, command):
        process = subprocess.Popen(command, stdout=subprocess.PIPE, shell=True)
        proc_stdout = process.communicate()

def main(args):
    try:
        load = Loader()
        os.chdir(r"C:\Users\hieun\github\Stocks-Manangement\backend\python-streaming\Stream")
        sequential = []
        i = 1
        sequential.append("python comment_consumer.py 0 stocksFrequency")
        sequential.append("python submission_producer.py stocks 0")
        sequential.append("python comment_producer.py stocks 0")

        sequential.append("python comment_consumer.py 1 wallstreetsFrequency")
        sequential.append("python submission_producer.py wallstreetbets 1")
        sequential.append("python comment_producer.py wallstreetbets 1")

        threads = [threading.Thread(target=load.subprocess_cmd, args=(fileList, ))
                   for fileList in sequential]
        for thread in threads:
            thread.daemon = True
        for thread in threads:
            print("Start " + str(thread))
            thread.start()
        for thread in threads:
            print("Join " + str(thread))
            thread.join()
    except Exception as ex:
        print("Exception occurs")

if __name__ == '__main__':
    try:
        main(sys.argv)
    except:
        print("Finishing up")