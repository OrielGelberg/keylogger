import json
from cryptography.fernet import Fernet

class Encrypt:
    def __init__(self):
        self.key = b'5v2OjJxyHMu1QAKgJXt5aUzo27mGtpMjnpNPTjHjvWg='
        self.cipher = Fernet(self.key)
    def xor (self,json_data):
        self.encrypted_data = self.cipher.encrypt(json_data)




