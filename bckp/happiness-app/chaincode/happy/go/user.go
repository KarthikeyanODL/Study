package main

/**
 * All User related functionalities implemented in this class
 **/

import (
	"encoding/json"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"github.com/hyperledger/fabric/protos/peer"
	"strconv"
)

/*
 * Define the user structure, with 3 properties
 */
type User struct {
	UserId  int    `json:"userId"`
	Balance int    `json:"balance"`
	DocType string `json:"docType"`
}

/*
 * func name   : registerUser
 * description : Register user details
 */
func (contract *HappinessChaincode) RegisterUser(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments, required: 2")
	}

	Log.Info("RegisterUser func called")
	key := args[0]

	if _, err := strconv.Atoi(key); err != nil {
		return shim.Error("Invalid input! UserId should be an Integer")
	}

	if _, err := strconv.Atoi(args[1]); err != nil {
		return shim.Error("Invalid input! balance should be an Integer")
	}

	userId, _ := strconv.Atoi(key)
	balance, _ := strconv.Atoi(args[1])
	docType := "user"

	var user = User{UserId: userId, Balance: balance, DocType: docType}

	userAsBytes, _ := json.Marshal(user)
	stub.PutState(key, userAsBytes)
	Log.Info("user  details Registered ")
	payload := []byte("User registered successfully")
	return shim.Success(payload)
}

/*
 * func name   : DeleteUser
 * description : Delete the user details
 */
func (contract *HappinessChaincode) DeleteUser(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	// key is userId
	key := args[0]

	if _, err := strconv.Atoi(key); err != nil {
		return shim.Error("Invalid input! userId should be an Integer")
	}

	// check if userId is exist in the DB or not
	response := contract.GetUserInfo(stub, args)
	if response.GetMessage() == "Invalid userId" {
		return shim.Error("Invalid userId, unable to delete")
	}

	// delete the user details
	err := stub.DelState(key)
	if err != nil {
		return shim.Error("Failed to delete User details")
	}
	payload := []byte("User deleted successfully")
	return shim.Success(payload)
}

/*
 * func name   : UpdateUserpoint
 * description : function to update the user points
 */
func (contract *HappinessChaincode) UpdateUserPoint(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	// Condition checking
	if len(args) != 3 {
		return shim.Error("Incorrect number of arguments, required 3")
	}

	// check if user details exist in the DB or not
	response := contract.GetUserInfo(stub, args[0:1])
	if response.GetMessage() == "Invalid userId" {
		return shim.Error("Invalid userId, unable to Update")
	}

	key := args[0]
	balance, _ := strconv.Atoi(args[1])
	operator := args[2]

	// get user details
	userAsBytes, err := stub.GetState(key)

	if err != nil {
		return shim.Error("Unable to get user details from DB")
	}

	user := User{}
	json.Unmarshal(userAsBytes, &user)
	prevPoints := user.Balance
	// updating point
	if operator == "add" {
		user.Balance = prevPoints + balance
	} else if operator == "sub" {
		user.Balance = prevPoints - balance
	} else {
		return shim.Error("Invalid operator! add/sub operator only allowed")
	}
	userAsBytes, _ = json.Marshal(user)
	stub.PutState(key, userAsBytes)

	payload := []byte("User points updated successfully")
	return shim.Success(payload)

}

/*
 * func name   : GetAllUser
 * description : retireves all user details
 */

func (contract *HappinessChaincode) GetAllUser(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	length := len(args)
	Log.Info("Get All user ")
	Log.Info(length)
	qry := ""
	// Condition checking
	if length != 2 {
		return shim.Error("Incorrect number of arguments, required 2")
	}

	startKey := args[0]
	endKey := args[1]

	Log.Info("Startkey " + startKey)
	if startKey != "noKey" {
		if _, err := strconv.Atoi(startKey); err != nil {
			return shim.Error("Invalid input! StartKey should be an Integer")
		}

		if _, err := strconv.Atoi(endKey); err != nil {
			return shim.Error("Invalid input! endKey should be an Integer")
		}

		qry += `{ "selector": { "$and": [ {"docType": "user" },`

		qry += `{ "userId": {
                             "$gte":`
		qry += "" + startKey + " ,"
		qry += `"$lte":`
		qry += " " + endKey + " }}]},"

		qry += `"fields": [
                    "userId",
                    "balance"
                    ],
                   "use_index": [
                    "indexOnUserId"
                    ]} `
	} else {

		qry += contract.getAllQuery()
	}
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
 * func name   : GetuserInfo
 * description : Get user specific details
 */
func (contract *HappinessChaincode) GetUserInfo(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	// Condition checking
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments, required 1")
	}
	userId := args[0]

	if _, err := strconv.Atoi(userId); err != nil {
		return shim.Error("Invalid input! userId should be an Integer")
	}

	qry := `{
                 "selector": { "$and": [ {"docType": "user" },`
	qry += `{
                  "userId": `
	qry += "" + userId + ""
	qry += `}
             ]
            },		 
                 "fields": [
                            "userId",
			    "balance"
                           ]} `

	code, resultJSON := contract.QueryUserResult(stub, qry, "single")
	if code != 200 {
		return shim.Error(resultJSON)
	}

	if resultJSON == "" {
		return shim.Error("Invalid userId")
	}

	return shim.Success([]byte(resultJSON))
}

func (contract *HappinessChaincode) getAllQuery() string {

	qry := `{ "selector":  {"docType": "user" },`
	qry += `"fields": [
                    "userId",
                    "balance"
                    ],
                   "use_index": [
                    "indexOnUserId"
                    ]} `
	Log.Info(qry)
	return qry

}
