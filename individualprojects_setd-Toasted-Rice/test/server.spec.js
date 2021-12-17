let server = require('../src/server')
let chai = require('chai')
let chaiHTTP = require('chai-http');
chai.should();
chai.use(chaiHTTP);
const { expect } = chai;

describe("The server should...", function() {
	it("return 200 when using arguments in the url", function(done) {
		chai.request(server)
			.get("/WebServices/NYTimesAPI?search_term=Denver")
			.end(function(err, res) {
				expect(res).to.have.status(200);
				done();
			});
		chai.request(server)
			.get("/WebServices/BreweryAPI?search_term=Denver")
			.end(function(err, res) {
				expect(res).to.have.status(200);
				done();
			});
	});

	it("fail when trying to post a review without any data", function(done) {
		chai.request(server)
			.post("/Update/BreweryReviews")
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			})
	});
});