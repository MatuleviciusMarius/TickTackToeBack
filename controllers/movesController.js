const Move = require('../models/Move');
const { validationResult } = require('express-validator');

module.exports.GET_ALL_MOVES = async (req, res) => {
  try {
    const moves = await Move.find({});
    res.status(200).json({ moves }).send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error retrieving all moves', err: err }).send();
  }
};

module.exports.DELETE_ALL_MOVES = async (req, res) => {
  try {
    await Move.deleteMany({});
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error deleting all moves', err: err }).send();
  }
};

module.exports.CREATE_NEW_MOVE = async (req, res, next) => {
  try {
    const { position, symbol } = req.body;
    const move = new Move({ position, symbol });
    await move.save();

    res.status(200).json(move).send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error creating a new move', err: err }).send();
  }
};
