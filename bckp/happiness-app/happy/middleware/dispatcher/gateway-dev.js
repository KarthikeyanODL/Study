 var contractInstance = require('./instance');

/**
 * All chaincode Queries are done by this function
 *
 */
exports.queryContract = async function() {

	console.log("#### Query function started")
	try {
           if(!isString(arguments)){
	    throw ("Invalid inputs")
	   }
	} catch (errorMsg){
	  throw (errorMsg)
	}

	try {

        // Query the chaincode
        var args = arguments.length;
	var contract 	
        await contractInstance.getInstance()
           .then(function(instance){
             contract = instance
        }).catch(function(errorMsg){
            console.error(errMsg)
      })
        var response;
        switch (args) {
			
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
		console.log("#### Query function over")
		   return JSON.parse(response.toString());

  

    } catch (error) {
    
        var msg = error.message
        console.error(msg)
	//var res = msg.search("message=")
	//if (res > 0) {
	// msg  = msg.slice(res+8)
	//}         
        //console.error(msg)
        throw (msg)

    }
	 //turn JSON.parse(response.toString());
}

/**
 * Creates the transaction & uses the submit function
 * All chain code - invoke will be done by using this function
 */
exports.submitTxnTransaction = async function() {

	console.log("#### Invoke function started")
    try {
           if(!isString(arguments)){
            throw ("Invalid inputs")
           }
        } catch (errorMsg){
          throw (errorMsg)
        }

	
    // Get the txn ID

    try {
        var argLength = arguments.length;
        var response;
	var contract
	    
        // Provide the function name
	await contractInstance.getInstance()
          .then(function(instance){
	     contract = instance
           }).catch(function(errorMsg){
            console.error(errMsg)
      })
             var txn = contract.createTransaction(arguments[0])
             var txName = txn.getName()
             var txId = txn.getTransactionID()
  

        switch (argLength) {

	    case 2:
                response = await txn.submit(arguments[1])
                break;		
            case 3:
                response = await txn.submit(arguments[1], arguments[2])
                break;
            case 8:
                response = await txn.submit(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7])
                break;
            case 4:
                response = await txn.submit(arguments[1], arguments[2], arguments[3])
                break;

        }

               var res = response.toString();
               var resobj = {
                  "Txn Id ": txn.getTransactionID().getTransactionID(),
                  "status": res
            };
	    console.log("#### Invoke function done")

             return resobj;
    } catch (e) {
	var msg = e.message
        console.error(msg)
	//var errMsg = msg.slice(msg.search("message=")+8)
     	//console.error(msg)    
	throw (msg)
    }

}

function isString(args) {
 
for (let item of args) {
  if (typeof item != 'string' || !item.trim()) {
      return false
  }	
 }
	return true
}


