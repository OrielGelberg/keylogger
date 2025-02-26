import json

class FileWriter:

        def __init__(self,filename = "keylog.json"):
            self.filename=filename

        def save_to_json(self,data):


            try:
                with open(self.filename, "w", encoding="utf-8") as file:
                   json.dump(data, file, indent=4, ensure_ascii=False)



                return data
            except Exception as e:
                print(f"Error saving file: {e}")
                return None


