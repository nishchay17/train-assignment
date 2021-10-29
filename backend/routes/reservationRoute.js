var express = require("express");

const { revervation } = require("../config/routes");
const {
  getAllSeats,
  reserveSeats,
  resetSeats,
} = require("../controller/revervationController");

const router = express.Router();

/**
 * @public
 * @description : returns all seats with there status
 */
router.get(revervation.allSeats, getAllSeats);

/**
 * @public
 * @description : reserves seat if available
 * @body : takes numberOfSeats to calcuate allocation
 */
router.post(revervation.reserve, reserveSeats);

/**
 * @public
 * @description : reserves seat if available
 * @body : takes numberOfSeats to calcuate allocation
 */
router.get(revervation.reset, resetSeats);

module.exports = router;
