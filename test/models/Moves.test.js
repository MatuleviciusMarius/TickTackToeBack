const MoveModel = require('../../models/Move');
const moveData = { position: 3, symbol: 'X' };

const { setupDB } = require('../setup');

// Setup a Test Database
setupDB('endpoint-testing');

// Change database name for each test
process.env.TEST_SUITE = 'move-model-test';
describe('Move model test', () => {
  it('Should successfully create and save a new move', async () => {
    const validMove = new MoveModel(moveData);
    const savedMove = await validMove.save();

    expect(savedMove.position).toBe(validMove.position);
    expect(savedMove.actionDate).toBeDefined();
  });

  it('should successfully delete all moves from database', async () => {
    const validMove = new MoveModel(moveData);
    const savedMove = await validMove.save();

    expect(savedMove).toBeDefined();

    const deleteResponse = await MoveModel.deleteMany({});
    expect(deleteResponse.deletedCount).toBe(1);
  });

  it('should get all moves', async () => {
    const validMove = new MoveModel(moveData);
    const savedMove = await validMove.save();

    expect(savedMove).toBeDefined();

    const allMovesResponse = await MoveModel.find({});

    expect(allMovesResponse.length).toBe(1);
  });
});
