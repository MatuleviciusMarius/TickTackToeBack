const Move = require('../models/Move');
const { check, validationResult } = require('express-validator');

moveValidationRules = () => {
  return [
    //Move position must be between 1 and 9
    check('position')
      .isInt()
      .custom((position) => {
        if (position < 1 || position > 9) {
          throw new Error('position must be between 1 and 9');
        } else {
          return true;
        }
      })
      //Check if a move with this position already exists
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
  ];
};

validateMove = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({ errors: extractedErrors });
  }

  return next();
};

module.exports = {
  validateMove,
  moveValidationRules,
};
