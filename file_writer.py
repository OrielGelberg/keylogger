import json
filename="keylog.json"
class FileWriter:

        def save_to_json(self,data):

            print(data)
            try:
                with open(filename, "w", encoding="utf-8") as file:
                   json.dump(data, file, indent=4, ensure_ascii=False)



                print(f" הנתונים נשמרו בהצלחה ל-{filename}")
            except Exception as e:
                print(f" שגיאה בשמירת הקובץ: {e}")


