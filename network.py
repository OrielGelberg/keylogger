import requests
import json


SERVER_URL = "http://127.0.0.1:5000/receive_data"  # כתובת השרת Flask

class NetworkWriter:
    def __init__(self, server_url=SERVER_URL):
        self.server_url = server_url

    def send_data(self, data):
        """ שולח את הנתונים לשרת Flask """
        try:
            #headers = {"Content-Type": "application/json"}
            response = requests.post(self.server_url, json=data)
            print(f"📤 Server Response: {response.status_code}, {response.json()}")
            if response.status_code == 200:
                print("✅ Data sent to server successfully!")
                return True
            else:
                error_message = response.text if response.text else "No response text"
                print(f"❌ Error sending: {response.status_code}, {error_message}")
                return False

        except requests.exceptions.Timeout:
            print("❌ Error: The server did not respond in time. (Timeout).")
            return False

        except requests.exceptions.ConnectionError:
            print("❌ Error: Connection to server failed. Make sure the server is running..")
            return False

        except Exception as e:
            print(f"❌ General error: {e}")
            return False
