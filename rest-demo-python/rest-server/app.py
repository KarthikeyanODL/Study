from flask import Flask, jsonify
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/sites/list", methods=['GET'])
def get_list():
    if request.method == 'GET':
        try:
             addr = "google.com,yahoo.com"
             return jsonify(status=addr, code=200)
        except Exception as exception:
             return jsonify(status=exception.args[0], code=500)
    return jsonify(status='Invalid request type', code=500)



@app.route("/api/<apikey>/sites/list", methods=['GET'])
def get_site_by_key(apikey):
    if request.method == 'GET':
        try:
             result = "your key is "+ str(apikey)
             return jsonify(status= result, code=200)
        except Exception as exception:
             return jsonify(status=exception.args[0], code=500)
    return jsonify(status='Invalid request type', code=500)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8888, debug=True)
