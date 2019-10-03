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
             return jsonify(status='Models are trained', code=200)
        except Exception as exception:
             return jsonify(status=exception.args[0], code=500)
    return jsonify(status='Invalid request type', code=500)



@app.route("/transactions_count_per_minute/<min_value>", methods=['GET'])
def get_transaction():
    if request.method == 'GET':
        try:
             return jsonify(status='Models are trained', code=200)
        except Exception as exception:
             return jsonify(status=exception.args[0], code=500)
    return jsonify(status='Invalid request type', code=500)



#3. Method to train the models
@app.route("/show_transactions/", methods=['GET'])
def show_transaction():
    if request.method == 'GET':
        try:
             xxx = db.get_transactions()
             return jsonify(status= xxx, code=200)
        except Exception as exception:
             return jsonify(status=exception.args[0], code=500)
    return jsonify(status='Invalid request type', code=500)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3330, debug=True)
