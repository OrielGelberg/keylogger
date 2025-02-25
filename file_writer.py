import json

class FileWriter:

        def __init__(self,filename = "keylog.json"):
            self.filename=filename

        def save_to_json(self,data):


            try:
                with open(self.filename, "w", encoding="utf-8") as file:
                   json.dump(data, file, indent=4, ensure_ascii=False)



                print(f" הנתונים נשמרו בהצלחה ל-{self.filename}")
                return data
            except Exception as e:
                print(f" שגיאה בשמירת הקובץ: {e}")
                return None


