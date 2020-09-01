const express = require('express');
const router = express.Router();
const MoveController = require('../../controllers/movesController');
const { moveValidationRules, validateMove } = require('../../middlewares/moveValidator');

//@desc Log new move to database
//@route /api/newMove
//@access public
router.post('/newMove', moveValidationRules(), validateMove, MoveController.CREATE_NEW_MOVE);

//@desc Get all moves from database
//@route /api/allMoves
//@access public
router.get('/allMoves', MoveController.GET_ALL_MOVES);

//@desc Delete all moves from the database
//@route /api/deleteAll
//@access public
router.delete('/deleteAll', MoveController.DELETE_ALL_MOVES);

module.exports = router;
