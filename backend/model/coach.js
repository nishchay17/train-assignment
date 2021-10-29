const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});
const Seat = mongoose.model("Seat", SeatSchema);
const CoachSchema = new mongoose.Schema({
  seats: {
    type: [SeatSchema],
    required: true,
  },
  remaining: {
    type: Number,
    default: 80,
  },
});

const Coach = mongoose.model("Coach", CoachSchema);

module.exports = { Coach, Seat };
