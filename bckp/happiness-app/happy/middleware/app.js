 /**
  * This file contains implementation of REST API to invoke/query with fabric network
  */

const express = require('express');
router = express.Router(),
bodyParser = require('body-parser'),
app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

var gateway = require('./dispatcher/gateway-dev');
var contractInstance = require('./dispatcher/instance');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//rest API requirements
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//middleware for create
var getAllUsers = function (req, res, next) {
      
      var startKey = req.query.startKey;
      var endKey = req.query.endKey;

      if (Number(startKey) > Number(endKey)) {
        res.status(400).json({ error: 'startKey should be lesser than endKey' })
      }
     
     if (typeof startKey === "undefined") {        
	     startKey = "noKey"
	     endKey = "noKey"
     }

      gateway.queryContract("getAllUser", startKey, endKey)
      .then(function(result){
              res.json(result);
        })
      .catch(function(errorMsg){                
		res.status(400).json({ error: "Unable to get user details, please provide valid inputs"})
        })
      
};

var registerUser = function (req, res, next) {
        var userId = req.body.userId;
        var points = req.body.balance;
        var conex = req.app.locals.connection;

        gateway.submitTxnTransaction("registerUser",userId, points)
        .then(function(result){
              res.json(result);
        }).catch(function(errorMsg){                
		res.status(400).json({ error: "Unable to register the User, please provide valid inputs"})
        })
};

var deleteUser = function (req, res, next) {
      var userId = req.params.userId;
        gateway.submitTxnTransaction("deleteUser",userId)
        .then(function(result){
              res.json(result);
        }).catch(function(errorMsg){
		res.status(400).json({ error: "Unable to delete the user, please provide valid inputs" })
        })

};

var updatePoint = function (req, res, next) {
       var userId = req.params.userId;
       var points = req.body.points;
       var operator = req.body.operator;	
         
	if (operator != "add" && operator != "sub"){
	    res.status(400).json({ error: 'Invalid operator value! add/sub operator only allowed' })
	}

        gateway.submitTxnTransaction("updateUserPoint",userId, points, operator)
        .then(function(result){
              res.json(result);
        }).catch(function(errorMsg){
		res.status(400).json({ error: "Unable to update the points, please provide valid inputs" })
        })

};


var getUserInfo = function (req, res, next) {
      var userId = req.params.userId;
        gateway.queryContract("getUserInfo",userId)
        .then(function(result){
              res.json(result);
        }).catch(function(errorMsg){
		res.status(400).json({ error: "Unable to get the user details, please provide valid inputs" })
        })

};

var addHistory = function (req, res, next) {
        var historyId = req.body.historyId;
        var userId  = req.body.userId;
        var points  = req.body.points;
        var time = req.body.time;
        var actionId = req.body.actionId;
        var status = req.body.status;
        var details = req.body.details;

        gateway.submitTxnTransaction("addHistory",historyId, userId, points, time, actionId, status, details)
        .then(function(result){
              res.json(result);
        }).catch(function(errorMsg){
		res.status(400).json({ error: "Unable to add history, please provide valid inputs" })
        })
};

var getHistory = function (req, res, next) {

      var startKey = req.query.startKey;
      var endKey = req.query.endKey;
      var limit = req.query.limit;	
      if (Number(startKey) > Number(endKey)) {
        res.status(400).json({ error: 'startKey should be lesser than endKey' })
      }

      if (typeof limit === "undefined") {
           limit = "20"
      }

      if (typeof startKey === "undefined") {
             startKey = "noKey"
             endKey = "noKey"
     }

     gateway.queryContract("getHistories", startKey, endKey, limit)
        .then(function(result){
              res.json(result);
        }).catch(function(errorMsg){
		res.status(400).json({ error: "Unable to get history details, please provide valid inputs" })
        })
};

var getUserHistory = function (req, res, next) {

        var userId = req.params.userId;
	var limit = req.query.limit;
        gateway.queryContract("getUserHistory",userId,limit)
        .then(function(result){
              res.json(result);
        }).catch(function(errorMsg){
		res.status(400).json({ error: "Unable to get the user history details, please provide valid inputs" })
        })

};

// initial settings
contractInstance.getInstance();


router.route('/users')
  .get(getAllUsers)
  .post(registerUser);

router.route('/users/:userId')
  .get(getUserInfo)
  .delete(deleteUser);

router.route('/users/:userId/point')
  .post(updatePoint);

router.route('/histories')
  .get(getHistory)
  .post(addHistory);

router.route('/histories/:userId')
  .get(getUserHistory);

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

app.listen(8787);
module.exports = app;

