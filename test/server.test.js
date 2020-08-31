const chai = require('chai');
const chaiHttp = require('chai-http');

const Move = require('../models/Move');

const { expect } = chai;
chai.use(chaiHttp);
describe('Moves', () => {
  it('Should call the database', async (done) => {
    const move = Move.findOne({});
    expect(move).to.be.a('object');
    done();
  });
});
