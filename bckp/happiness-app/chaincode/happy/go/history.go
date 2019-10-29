package main

import (
	"encoding/json"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"github.com/hyperledger/fabric/protos/peer"
	"strconv"
)

/*
 * Define the history structure, with  properties
 */

type History struct {
	HistoryId int    `json:"historyId"`
	UserId    int    `json:"userId"`
	Points    int    `json:"points"`
	Time      string `json:"time"`
	ActionId  int    `json:"actionId"`
	Status    string `json:"status"`
	Details   string `json:"details"`
	DocType   string `json:"docType"`
}

/*
 * func name   : AddHistory
 * description : adding history details of the  user
 */

func (contract *HappinessChaincode) AddHistory(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 7 {
		return shim.Error("Incorrect number of arguments, required: 7")
	}

	Log.Info("AddHistory func called")
	// historyId, userId, , points, time, actionId, status, details
	docType := "history"
	key := args[0]

	if _, err := strconv.Atoi(key); err != nil {
		return shim.Error("Invalid input! HistoryId should be an Integer")
	}

	if _, err := strconv.Atoi(args[1]); err != nil {
		return shim.Error("Invalid input! userId should be an Integer")
	}

	if _, err := strconv.Atoi(args[2]); err != nil {
		return shim.Error("Invalid input! Points should be an Integer")
	}

	if _, err := strconv.Atoi(args[4]); err != nil {
		return shim.Error("Invalid input! actionId should be an Integer")
	}

	historyId, _ := strconv.Atoi(key)
	userId, _ := strconv.Atoi(args[1])
	points, _ := strconv.Atoi(args[2])
	time := args[3]
	actionId, _ := strconv.Atoi(args[4])
	status := args[5]
	details := args[6]

	var history = History{HistoryId: historyId, UserId: userId, Points: points, Time: time, ActionId: actionId, Status: status, Details: details, DocType: docType}

	historyAsBytes, _ := json.Marshal(history)
	stub.PutState(key, historyAsBytes)
	Log.Info("userId  history details Added ")

	payload := []byte("History details added successfully ")
	return shim.Success(payload)

}

/*
 * func name   : GetHistories
 * description : Get all user histories
 */

func (contract *HappinessChaincode) GetHistories(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	length := len(args)
	// Condition checking
	if length != 3 {
		return shim.Error("Incorrect number of arguments, required  3")
	}
	startKey := args[0]
	endKey := args[1]
	limit := args[2]
	qry := ""
	if startKey != "noKey" {
		if _, err := strconv.Atoi(startKey); err != nil {
			return shim.Error("Invalid input! StartKey should be an Integer")
		}

		if _, err := strconv.Atoi(endKey); err != nil {
			return shim.Error("Invalid input! endKey should be an Integer")
		}

		if _, err := strconv.Atoi(limit); err != nil {
			return shim.Error("Invalid input! limit should be an Integer")
		}

		qry += `{ "selector": { "$and": [ {"docType": "history" },`

		qry += `{ "userId": {
                             "$gte":`
		qry += " " + startKey + " ,"
		qry += `"$lte":`
		qry += " " + endKey + " }}]},"

		qry += `
                 "fields": [
                            "actionId",
                            "details",
                            "historyId",
                            "points",
                            "status",
                            "time",
                            "userId"
                           ], 
	         "use_index": [ "indexOnHistoryId" ],
		 "limit": `
		qry += " " + limit + " }"
	} else {
		qry += contract.GetAllhistoryQuery(limit)
	}
	Log.Info("get All history Query \n\n")
	Log.Info(qry)
	code, resultJSON := contract.QueryUserResult(stub, qry, "all")
	if code != 200 {
		return shim.Error(resultJSON)
	}

	if resultJSON == "" {
		return shim.Error("Invalid userId")
	}

	return shim.Success([]byte(resultJSON))
}

/*
 * func name   : GetUserHistory
 * description : Get user specific histories
 */
func (contract *HappinessChaincode) GetUserHistory(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	// Condition checking
	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments, required 2")
	}

	userId := args[0]
	limit := args[1]

	if _, err := strconv.Atoi(userId); err != nil {
		return shim.Error("Invalid input! userId should be an Integer")
	}

	qry := `{
                 "selector": { "$and": [ {"docType": "history" },`
	qry += `{
                  "userId": `
	qry += "" + userId + ""
	qry += `}
             ]
            },
                 "fields": [
                           "actionId",
                           "details",
                           "historyId",
                           "points",
                           "status",
                           "time",
                           "userId"                            
                           ],
	           "limit": `
	qry += " " + limit + " }"

	Log.Info("Usr History qry \n\n")
	Log.Info(qry)
	code, resultJSON := contract.QueryUserResult(stub, qry, "all")
	Log.Info(len(resultJSON))
	if code != 200 {
		return shim.Error(resultJSON)
	}
	// empty response came for single user
	if len(resultJSON) == 15 {
		return shim.Error("Invalid userId")
	}

	return shim.Success([]byte(resultJSON))
}

func (contract *HappinessChaincode) GetAllhistoryQuery(limit string) string {

	qry := `{ "selector":  {"docType": "history" },`

	qry += `
                 "fields": [
                            "actionId",
                            "details",
                            "historyId",
                            "points",
                            "status",
                            "time",
                            "userId"
                           ],
                 "use_index": [ "indexOnHistoryId" ],
                 "limit": `
	qry += " " + limit + " }"

	return qry

}
