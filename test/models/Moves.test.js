const mongoose = require('mongoose');
const MoveModel = require('../../models/Move');
const moveData = { position: 3, symbol: 'X' };

const databaseName = 'jest';

describe('Move model test', () => {
  let dbConnection;

  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    dbConnection = await mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

  it('create & save user successfully', async () => {});
});
