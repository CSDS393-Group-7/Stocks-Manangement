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
        os.chdir(r"C:\Users\hieun\PycharmProjects\pythonProject\Stream")
        # sequential = ['python comment_consumer.py'] \
        #              + ["python comment_producer.py " + arg for arg in args if arg != 'main.py'] \
        #              + ["python submission_producer.py " + arg for arg in args if arg != 'main.py']
        sequential = []
        i = 1
        while i < len(sys.argv):
            sequential.append("python comment_consumer.py " + sys.argv[i + 1] + " " + sys.argv[i + 2])
            sequential.append("python submission_producer.py " + sys.argv[i] + " " + sys.argv[i + 1])
            sequential.append("python comment_producer.py " + sys.argv[i] + " " + sys.argv[i + 1])
            i = i + 3
        print(sequential)
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