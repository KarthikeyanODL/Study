var expect    = require("chai").expect;
var intial = require("../dispatcher/instance");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../app");
let should = chai.should();
chai.use(chaiHttp);

describe("Testing", function() {

  before(async function() {
          return await intial.getInstance();

           });



     var users = [{
            "userId": "1215",
            "balance": "1000"

        }, {
            "userId": "1213",
            "balance": "100"

        },{
            "userId": "1700",
            "balance": "700"
         }

         ]


    it("Should add users", (done) => {
            for (user in users) {
                chai.request(server)
                    .post("/api/v1/users")
                    .send(users[user])
                    .end((err, res) => {
                        res.should.have.status(200);
                        console.log("Response Body:", res.body);

                  })
                 }
           done()
        })

           it ("Should Fecth all the users", (done)=>{
            chai.request(server)
                .get("/api/v1/users?startKey=1&endKey=20")
                .end((err, result)=>{
                    result.should.have.status(200);
                    //console.log ("Got",result.body.data.length, " docs")
                    console.log ("Result Body:", result.body);
                    done()
                })
        })


         it ("Should Fetch Particular User only", (done)=>{
            chai.request(server)
                .get("/api/v1/users/"+users[1].userId)
                .end((err, result)=>{
                    result.should.have.status(200)
                    console.log("Fetched Particlar user using /GET/Users/:userId ::::", result.body)
                    done()
                })
        })

       
	it ("Should Update Partcular User Only", (done)=>{
            var updatedPoints = {

                    "points": "100",
                    "operator": "add"

            }

            chai.request(server)
                .post("/api/v1/users/"+users[2].userId+"/point")
                .send(updatedPoints)
                .end((err, result)=>{
                    result.should.have.status(200)
                    console.log("Updated Particlar User point ::::", result.body)
                    done()
                })
        })


      it("Should Delete Particular User", (done)=>{
            chai.request(server)
                .delete("/api/v1/users/1215")
                .end((err, result)=>{
                    result.should.have.status(200)
                    console.log("Deleted Particlar User using  ::::", result.body)
                    done()
                })
        })

       var histories = [{
                       "historyId": "100",
                       "userId": "10",
                       "points": "50",
                       "time": "12/5/94",
                       "actionId": "77",
                       "status": "test",
                       "details": "test"
                },
                        {
                       "historyId": "101",
                       "userId": "20",
                       "points": "50",
                       "time": "24/8/92",
                       "actionId": "78",
                       "status": "test",
                       "details": "test"
                }
       ]

         
    it("Should add history", (done) => {
            for (history in histories) {
                chai.request(server)
                    .post("/api/v1/histories")
                    .send(histories[history])
                    .end((err, res) => {
                        res.should.have.status(200);
                        console.log("Response Body:", res.body);

                  })
                 }
           done()
        })


	 it ("Should Fecth all the histories", (done)=>{
            chai.request(server)
                .get("/api/v1/histories?startKey=1&endKey=2000&limit=20")
                .end((err, result)=>{
                    result.should.have.status(200);
                    //console.log ("Got",result.body.data.length, " docs")
                    console.log ("Result Body:", result.body);
                    done()
                })
        })

	
 it ("Should Fetch Particular User history only", (done)=>{
            chai.request(server)
                .get("/api/v1/histories/10?limit=20")
                .end((err, result)=>{
                    result.should.have.status(200)
                    console.log("Fetched Particlar User History  ::::", result.body)
                    done()
                })
        })

 

});
