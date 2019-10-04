from flask import Flask, jsonify
from flask import request
from flask_cors import CORS

#from dbservice import db
import db

app = Flask(__name__)
CORS(app)

@app.route("/high_value_addr", methods=['GET'])
def get_value_addr():
    if request.method == 'GET':
        try:
             addr = db.get_high_value_addr()
             return jsonify(status=addr, code=200)
        except Exception as exception:
             return jsonify(status=exception.args[0], code=500)
    return jsonify(status='Invalid request type', code=500)



@app.route("/transactions_count_per_minute/<minvalue>", methods=['GET'])
def get_transaction(minvalue):
    if request.method == 'GET':
        try:
             result = db.get_transactions_per_minute(minvalue)
             return jsonify(status= result, code=200)
        except Exception as exception:
             return jsonify(status=exception.args[0], code=500)
    return jsonify(status='Invalid request type', code=500)



#3. Method to train the models
@app.route("/show_transactions/", methods=['GET'])
def show_transaction():
    if request.method == 'GET':
        try:
             transactions = db.get_transactions()
             return jsonify(status= transactions, code=200)
        except Exception as exception:
             return jsonify(status=exception.args[0], code=500)
    return jsonify(status='Invalid request type', code=500)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3330, debug=True)
