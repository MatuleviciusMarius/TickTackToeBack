const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

//Load Move model
const Move = require('../../models/Move');

//@desc Log new move to database
//@route /api/newMove
//@access public
router.post(
  '/newMove',
  [
    // Position must be integer and between 1 and 9 and must be unique
    check('position')
      .isInt()
      .custom((position) => {
        if (position < 1 || position > 9) {
          throw new Error('Position must be between 1 and 9');
        }
        return true;
      })
      .custom((position) => {
        let query = Move.find({ position });
        return query.exec().then((move) => {
          if (move.length > 0) {
            return Promise.reject('Position already exists');
          }
        });
      }),
    // Symbol must be X or Y
    check('symbol', `Value must be X or O`).isIn(['X', 'O']),
  ],
  (req, res) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { position, symbol } = req.body;

    const move = new Move({ position, symbol });

    move.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.json(move).status(200);
      }
    });
  }
);

//@desc Get all moves from database
//@route /api/allMoves
//@access public
router.get('/allMoves', function (req, res) {
  let allMoves = {};
  Move.find({}, (err, moves) => {
    if (err) console.log(err);
    else {
      allMoves = moves.map((move) => {
        return new Move({ position: move.position, symbol: move.symbol, actionDate: move.actionDate });
      });
      console.log(allMoves);
      res.json(allMoves);
    }
  });
});

//@desc Delete all moves from the database
//@route /api/deleteAll
//@access public
router.delete('/deleteAll', function (req, res) {
  Move.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send();
    }
  });
});

module.exports = router;
