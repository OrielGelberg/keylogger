import requests
import json

SERVER_URL = "http://127.0.0.1:5000"  # כתובת השרת

class NetworkWriter:
    def __init__(self, server_url=SERVER_URL):
        self.server_url = server_url

    def send_data(self):
        print("zfxzxcx")


        payload = {'hello': 'Hi'}
        payload = json.dumps(payload)
        headers = {"Content-Type": "application/json"}
        response = requests.post(url="http://127.0.0.1:5000", json=payload, headers=headers)

        if response.status_code == 200:
            print("✅ Data sent successfully!")
            return True
        else:
            print(f"❌ Error sending data: {response.text}")
            return False

