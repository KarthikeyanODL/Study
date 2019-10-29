/*
 * Smart contract for Happiness Application
 *
 */
package main

/* Imports
 * Specific Hyperledger Fabric specific libraries for Smart Contracts
 */

import (
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"github.com/hyperledger/fabric/protos/peer"
)

type HappinessChaincode struct {
}

/*
 * Create instance of logger
 */
const ChaincodeName = "happy"

var Log = shim.NewLogger(ChaincodeName)

/*
 * The Init method is called when the Chain code "happiness"
 * is instantiated by the blockchain network
 */
func (contract *HappinessChaincode) Init(stub shim.ChaincodeStubInterface) peer.Response {
	Log.Info("Init executed")
	return shim.Success(nil)
}

/*
 * The Invoke method is called as a result of an application request to run the Chain code "happiness"
 * The calling application program has also specified the particular smart contract function to be called, with arguments
 */
func (contract *HappinessChaincode) Invoke(stub shim.ChaincodeStubInterface) peer.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := stub.GetFunctionAndParameters()
	Log.Info("Invoke is running " + function)

	// Route to the appropriate handler function to interact with the ledger appropriately
	if function == "registerUser" {
		return contract.RegisterUser(stub, args)
	} else if function == "deleteUser" {
		return contract.DeleteUser(stub, args)
	} else if function == "updateUserPoint" {
		return contract.UpdateUserPoint(stub, args)
	} else if function == "getAllUser" {
		return contract.GetAllUser(stub, args)
	} else if function == "getUserInfo" {
		return contract.GetUserInfo(stub, args)
	} else if function == "addHistory" {
		return contract.AddHistory(stub, args)
	} else if function == "getHistories" {
		return contract.GetHistories(stub, args)
	} else if function == "getUserHistory" {
		return contract.GetUserHistory(stub, args)
	}

	return shim.Error("Invalid function name")
	//payload := []byte("Invalid function name")
	//return peer.Response{Status: 401, Message: "Unauthorized", Payload: payload}
}

/*
 * main function
 */
func main() {

	Log.Info("Started chain code")
	err := shim.Start(new(HappinessChaincode))
	if err != nil {
		Log.Error("Error Starting chain code : %s", err)
	}
}
