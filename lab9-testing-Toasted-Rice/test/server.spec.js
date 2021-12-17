// Imports the server.js file to be tested.
const server = require("../server");
// Assertion (Test Driven Development) and Should,  Expect(Behaviour driven 
// development) library
const chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

describe("Server!", () => {
  // Sample test case given to test / endpoint.
  it("Returns the default welcome message", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        assert.strictEqual(res.body.message, "Welcome!");
        done();
      });
  });

  // ===========================================================================
  // TODO: Please add your test cases for part A here.
  it("Testing receipt of operations json", (done) => {
	chai
		.request(server)
		.get("/operations")
		.end((err, res) => {
			expect(res.body).to.be.an('array').that.is.not.empty;
			done();
		});
  });

  it("Testing operation with id=1", (done) => {
	  chai
	  	.request(server)
		.get("/operations/1")
		.end((err, res) => {
			assert.strictEqual(res.body.id,1,"Operation has id=1");
			expect(res.body).to.have.property("name");
			expect(res.body).to.have.property("sign");
			done();
		});
  });

  it("Testing addition of new operation.", (done) => {
	  const newOp = {name:"Divide", sign:"/"};
	  chai
	  	.request(server)
		.post("/operations")
		.send(newOp)
		.end((err, res) => {
			assert.strictEqual(res.body.id,4,"New operation has id=4");
			assert.strictEqual(res.body.name,"Divide","New operatino has correct name.");
			assert.strictEqual(res.body.sign,"/","New operation has correct sign.");
			done();
		});
  });
  

  // ===========================================================================
  // TODO: Please add your test cases for part B here.
  it("Positive test case for /add", (done) => {
	chai
		.request(server)
		.post("/add")
		.send({num1: 4, num2: 17})
		.end((err, res) => {
			assert.strictEqual(res.body.sum,21,"4+17 correctly sums to 21.");
			done();
		});
  });
  
  it("Positive test case for /divide", (done) => {
	chai
		.request(server)
		.post("/divide")
		.send({num1: 2048, num2: 32})
		.end((err, res) => {
			assert.strictEqual(res.body.quotient,64,"1024/32 correctly divides to 64.");
			done();
		});
  });
  
  it("Negative test case for /add", (done) => {
	chai
		.request(server)
		.post("/add")
		.send({num1: 4})
		.end((err, res) => {
			expect(res).to.have.status(400);
			done();
		});
  });
  
  it("Negative test case for /divide", (done) => {
	chai
		.request(server)
		.post("/divide")
		.send({num1: 1337, num2: 0})
		.end((err, res) => {
			expect(res).to.have.status(405);
			done();
		});
  });



});
