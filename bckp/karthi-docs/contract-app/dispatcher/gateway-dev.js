/**
 * Demonstrates the use of Gateway Network & Contract classes
 */
const fs = require('fs');
// Used for parsing the connection profile YAML file
const yaml = require('js-yaml');
// Import gateway class
const {
    Gateway,
    FileSystemWallet,
    DefaultEventHandlerStrategies,
    Transaction
} = require('fabric-network');

// Constants for profile
const CONNECTION_PROFILE_PATH = './connection-profiles/dev-connection.yaml'
// Path to the wallet
const FILESYSTEM_WALLET_PATH = './dispatcher/user-wallet'
// Identity context used
const USER_ID = 'Admin@acme.com'
// Channel name
const NETWORK_NAME = 'airlinechannel'
// Chaincode
const CONTRACT_ID = "empcc"

// 1. Create an instance of the gatway
const gateway = new Gateway();

var contract;

setup()

async function setup() {
    try {
        console.log("Setup function called")
        // 2. Setup the gateway object
        await setupGateway()

        // 3. Get the network
        let network = await gateway.getNetwork(NETWORK_NAME)
        // 4. Get the contract
        contract = await network.getContract(CONTRACT_ID);
        //console.log(contract)
    } catch (e) {
        console.log(e)
    }
}

/**
 * Function for setting up the gateway
 * It does not actually connect to any peer/orderer
 */
async function setupGateway() {

    // 2.1 load the connection profile into a JS object
    let connectionProfile = yaml.safeLoad(fs.readFileSync(CONNECTION_PROFILE_PATH, 'utf8'));

    // 2.2 Need to setup the user credentials from wallet
    const wallet = new FileSystemWallet(FILESYSTEM_WALLET_PATH)

    // 2.3 Set up the connection options
    let connectionOptions = {
        identity: USER_ID,
        wallet: wallet,
        discovery: {
            enabled: false,
            asLocalhost: true
        }
        /*** Uncomment lines below to disable commit listener on submit ****/
        ,
        eventHandlerOptions: {
            strategy: null
        }
    }

    // 2.4 Connect gateway to the network
    await gateway.connect(connectionProfile, connectionOptions)
    // console.log( gateway)
}


/**
 * All chaincode Queries are done by this function
 *
 */
exports.queryContract = async function() {
    try {

        // Query the chaincode
        var args = arguments.length;
        var response;
        switch (args) {
            case 1:
                response = await contract.evaluateTransaction(arguments[0])
                break;
            case 2:
                response = await contract.evaluateTransaction(arguments[0], arguments[1])
                break;
            case 3:
                response = await contract.evaluateTransaction(arguments[0], arguments[1], arguments[2])
                break;
            case 4:
                response = await contract.evaluateTransaction(arguments[0], arguments[1], arguments[2], arguments[3])
                break;
        }
        console.log(`Query Response=${response.toString()}`);
        //return JSON.parse(response.toString());
        return response.toString();

    } catch (e) {
        console.log(e)
    }
}

/**
 * Creates the transaction & uses the submit function
 * All chain code - invoke will be done by using this function
 */
exports.submitTxnTransaction = async function() {

    var argLength = arguments.length;
    var response;
    // Provide the function name
    var txn = contract.createTransaction(arguments[0])
    var txName = txn.getName()
    var txId = txn.getTransactionID()

    // Get the txn ID
    console.log(txId)

    try {

        switch (argLength) {
            case 1:
                response = await txn.submit()
                break;
            case 8:
                response = await txn.submit(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7])
                break;
            case 4:
                response = await txn.submit(arguments[1], arguments[2], arguments[3])
                break;

        }
        console.log(`Response=${response.toString()}`);
    } catch (e) {
        console.log(e)
    }
    var res = response.toString();

    var resobj = {
        "Txn name ": txName,
        "Txn Id ": txn.getTransactionID(),
        "status": res
    };

    return resobj;

}
