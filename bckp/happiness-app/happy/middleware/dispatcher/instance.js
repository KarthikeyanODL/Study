/**
 * Demonstrates the use of Gateway Network & Contract classes
 */

var userWallet = require('./enrollAdmin');
var contract = require('./contract')
var contractInstance = undefined;

exports.getInstance = async function() {
       
      try {
            if (  ! contractInstance ) {
            console.log("\n\ncreating instance\n")
            await userWallet.setup()
            contractInstance  = await contract.getContract()
           		      
      }
      console.log("returning instance")
      return contractInstance;

      } catch (error){
        console.log(error)
      }
}

