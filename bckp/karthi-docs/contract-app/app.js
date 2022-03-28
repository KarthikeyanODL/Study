/**
 * This file contains implementation of REST API to invoke/query with fabric network
 */

var express = require("express");
var bodyParser = require('body-parser');
var userWallet = require('./dispatcher/wallet-dev');
var gateway = require('./dispatcher/gateway-dev') 
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(8787, () => {
 console.log("Server running on port 8787");
});


//1. create wallet for user
app.post("/adduser", function(req,res) {
    
	var username = req.body.username;
	var orgName = req.body.orgName;
	console.log("username :"+username);
	console.log("org :"+orgName);
        userWallet.addToWallets(orgName,username)
		.then(function(result){
		     res.json(result);
	     }).catch(function(error){
		     console.log("Error, Unable to add user");
	     })

});


//2. export wallet
app.get("/exportwallet/org/:orgName/user/:username",function(req, res){
       var username = req.params.username;
       var orgName = req.params.orgName;
       userWallet.exportIdentity(orgName,username)
		.then(function(result){
	       res.json(result);
       }).catch(function(error){
	       console.log("Error, Unable to export wallet ");
       })
});


//3. list users
app.get("/listuser",function (req, res) {
       

	userWallet.listIdentities()
	.then(function(result){
		res.json(result);
	}).catch(function(error){
		console.log("Error, Unable to list Identities ");
	})
});

//4.  add-employees
app.post("/employee/add",function(req,res){
     
	gateway.submitTxnTransaction("addEmployee")
	.then(function(result){
              res.json(result);
	}).catch(function(error){
                console.log("Error, Unable to add employees ");
        })

});

//5.  get-employees
app.get("/get/employees",function(req,res){
	 gateway.queryContract("getEmployees")
        .then(function(result){
              res.json(result);
        }).catch(function(error){
                console.log("Error, Unable to get employees ");
        })


});

//6. create-employee
app.post("/employee/create",function(req,res){
 
	var empname = req.body.empname;
	var empid = req.body.empid;
	var salary = req.body.salary;
	var workHrs = req.body.workHrs;
	var empType = req.body.empType;
	var pCompany = req.body.parentCompany;
	var cCompany = req.body.currentCompany;

	gateway.submitTxnTransaction("createEmployee",empid,empname,salary,workHrs,empType,pCompany,cCompany)
        .then(function(result){
              res.json(result);
        }).catch(function(error){
                console.log("Error, Unable to add employees ");
        })


});


//7. transfer-employee
app.post("/employee/transfer",function(req,res){
 
        var empid = req.body.empid;
	var from = req.body.fromCompany;
	var to = req.body.toCompany;
	gateway.submitTxnTransaction("sendEmployee",empid,from,to)
        .then(function(result){
              res.json(result);
        }).catch(function(error){
                console.log("Error, Unable to add employees ");
        })


});


//8. get-employee with pagination
app.get("/get/employee/pagination",function(req,res){
 	
        var fromEmpid = req.query.fromEmpid;
	var toEmpid = req.query.toEmpid;
	var page = req.query.page;
	console.log(page);
	gateway.queryContract("GetEmployeesByRangeWithPagination",fromEmpid, toEmpid, page)
        .then(function(result){
              res.send(result);
        }).catch(function(error){
                console.log("Error, Unable to get employees ");
        })
 

});

//9. get-employee history
app.get("/employee/:employeeID/history",function(req,res){

        var empId = req.params.employeeID; 
	gateway.queryContract("getEmployeeTxHistory",empId)
        .then(function(result){
              res.json(result);
        }).catch(function(error){
                console.log("Error, Unable to get employees ");
        })


});

//10. Rich query get-employee by id 
app.get("/employee/get/:employeeID",function(req,res){
         
	var empId = req.params.employeeID;
        gateway.queryContract("GetEmployeeById",empId)
        .then(function(result){
              res.json(result);
        }).catch(function(error){
                console.log("Error, Unable to get employees ");
        })

});

//11. user query
app.get("/userquery",function(req,res){
        
	var empType = req.query.empType;
        var query = "{\"selector\":{\"employeeType\": \""+ empType +"\"}}"
        console.log(query); 
        gateway.queryContract("ExecuteUserQuery",query)
        .then(function(result){
              res.json(result);
        }).catch(function(error){
                console.log("Error, Unable to get employees ");
        })

});

//12. user query by index
app.get("/get/userquery/index",function(req,res){


gateway.queryContract("ExecuteUserQuery")
        .then(function(result){
              res.json(result);
        }).catch(function(error){
                console.log("Error, Unable to get employees ");
        })

});

//13. get emp-company by pagination
app.get("/employee/company",function(req,res){

        var company = req.query.company;
        var query = "{\"selector\":{\"parentCompany\": \""+ company +"\"}}"
	console.log(query)
        gateway.queryContract("GetEmployeeByCompany",query)
        .then(function(result){
              res.json(result);
        }).catch(function(error){
                console.log("Error, Unable to get employees ");
        })

});



















