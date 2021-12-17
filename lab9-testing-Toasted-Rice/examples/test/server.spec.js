let server = require('../server');
let chai = require('chai');
let chaiHttp = require('chai-http');

// Assertion
chai.should();
chai.use(chaiHttp);
const { expect } = chai;

describe('Server!', () => {
  it('It should POST a new course', (done) => {
    const op = {
      title: 'CSCI2400',
      id: 4,
    };
    chai
      .request(server)
      .post('/add_courses')
      .send(op)
      .end((err, response) => {
        expect(response.body.id).to.equals(4);
        expect(response.body.title).to.equals('CSCI2400');
        expect(response).to.have.status(200);
        done();
      });
  });

  it('It should uppercase a string', (done) => {
    chai
      .request(server)
      .post('/upper')
      .send({val: 'a normal string'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.val).to.equals('A NORMAL STRING');
        
        done();
      });
  });

  it('It should error for numbers', (done) => {
    chai
      .request(server)
      .post('/upper')
      .send({val: 1})
      .end((err, res) => {
        expect(res).to.have.status(400);
        
        done();
      });
  });


});
