from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

received_data_storage = {}


@app.route('/receive_data', methods=['POST'])
def receive_data():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data received"}), 400

    received_data_storage = data

    print(f"📥 Data received: {data}")
    return jsonify({"message": "✅ Data received successfully!"}), 200


@app.route('/send_data', methods=['GET'])
def send_data():
    return jsonify(received_data_storage), 200


if __name__ == '__main__':
    app.run(debug=True)
