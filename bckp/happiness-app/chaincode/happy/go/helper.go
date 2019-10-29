package main

import (
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"github.com/hyperledger/fabric/protos/ledger/queryresult"
)

/*
 * func name   : QueryUserResult
 * description : Helper function to fetch data from the DB
 */
func (contract *HappinessChaincode) QueryUserResult(stub shim.ChaincodeStubInterface, qry string, qtype string) (int, string) {

	// resultJSON, arr is for Querying all user details
	var resultJSON = "{ \"result\": "
	var arr = "["
	// result is for Query single user details
	result := ""
	query := qry

	// Print the received query on the console
	Log.Info("Query JSON=%s \n\n", query)

	// GetQueryResult
	QryIterator, err := stub.GetQueryResult(query)

	// Return if there is an error
	if err != nil {
		Log.Error(err.Error())
		return 400, "Error in executing query, userId should be integer "
	}

	// Iterate through the result set
	counter := 0
	for QryIterator.HasNext() {
		// Hold pointer to the query result
		var resultKV *queryresult.KV
		var err error

		// Get the next element
		resultKV, err = QryIterator.Next()

		// Return if there is an error
		if err != nil {
			Log.Error("Err=" + err.Error())
			return 400, "Unable to fetch the Query results"
		}

		// Increment the counter
		counter++
		// condition for checking single or multiple query results

		if qtype != "all" {
			result += string(resultKV.GetValue())
		} else {

			if arr != "[" {
				arr += ","
			}
			arr += "" + string(resultKV.GetValue()) + ""
		}
	}
	// Close the iterator
	QryIterator.Close()
	if qtype != "all" {
		return 200, result
	}

	arr += "]"
	resultJSON += arr + "}"

	return 200, resultJSON
}
