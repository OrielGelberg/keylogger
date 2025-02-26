
import json
import os
from abc import ABC, abstractmethod

class AbstractJSON(ABC):
    """
    מחלקה אבסטרקטית שמחזירה גייסון
    """

    @abstractmethod
    def get_json_file(self) -> dict:
        """
        מחזירה נתונים של גייסון
        :return:
        """
        pass

class File_json(AbstractJSON):
    """
    מחלקה שמביאה מקובץ גייסון
    """

    def __init__(self , file_path:str):
        self.file_path = file_path

    def get_json_file(self) -> dict:
        """
        קריאה מקובץ גייסון
        :return:
        """
        with open(self.file_path) as json_file:
            return json.load(json_file)

class XORencrypto:
    """
    מחלקה שמצפינה בשיטת XOR
    """

    @staticmethod
    def encrypt(key:str, data:str) -> str:
        """
        מבצע XOR על כל תו ותו בטקס עם מפתח
        :param key:
        :param data:
        :return:
        """
        key_len = len(key)
        return "".join(chr(ord(data[i])^ ord(key[i % key_len]) ) for i in range(len(data)))

    @staticmethod
    def decrypt_json(json_data:dict ,key:str) -> dict:
        json_str = json.dumps(json_data)

    @staticmethod
    def encrypt_json(json_data: dict ,key: str):
        """
        מקבל גייסון רגיל ומחזיר אותו מוצפן
        :param json_data:
        :param key:
        :return:
        """
        json_str = json.dumps(json_data)  # הופך גייסון למחרוזת
        encrypted_str = XORencrypto.encrypt(json_str, key) #  הצפנה
        return {"encrypted_data": encrypted_str} # גייסון חדש עם נתונים מוצפנים

    @staticmethod
    def decrypt_json(encrypted_json:dict ,key:str) -> dict:
        """
        מקבל גייסון מוצפן וחמזיר גייסון מפוענח
        :param encrypted_json:
        :param key:
        :return:
        """
        encrypted_str = encrypted_json["encrypted_data"]
        decrypted_str = XORencrypto.encrypt(encrypted_str ,key)
        return json.loads(decrypted_str)

    """
    אפשרות לקרוא ולפתוח את הקבצים המוצפנים
    """
    def save_json(self ,file_name:str ,data:dict):
        with open(file_name ,"w" , encoding = "utf-8") as file:
            json.dump(data ,file ,indent=4)

    def load_json(self ,file_name:str) -> dict:
        with open(file_name ,"r" ,encoding="utf-8") as file:
            return json.load(file)



# key = "hello world"
#
# json_file = File_json("C:\\Users\\HOME\\OneDrive\\Desktop\\data.json")
#
# original_json = json_file.get_json_file()
# print(f"📄 JSON מקורי: {original_json}")
#
# encryptor = XORencrypto()
# encrypted_json = encryptor.encrypt_json(original_json ,key)
# print(f"🔒 JSON מוצפן: {encrypted_json}")
#
# encryptor.save_json("encrypted_data.json" ,encrypted_json)
#
# loaded_encrypted_json = encryptor.load_json("encrypted_data.json")
#
# decrypted_json =encryptor.decrypt_json(loaded_encrypted_json ,key)
# print(f"🔓 JSON מפוענח: {decrypted_json}")
