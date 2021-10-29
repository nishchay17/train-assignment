const { Coach } = require("../model/coach");
const { createSeats } = require("../util/createSeats");
const { getAllocation } = require("../util/getAllocation");

const COACH_SIZE = process.env.COACH_SIZE;
const MAX_SEAT_IN_ONE_REVERVATION = process.env.MAX_SEAT_IN_ONE_REVERVATION;

exports.getAllSeats = async function (req, res) {
  try {
    const coach = await Coach.find({});
    if (coach.length === 0) {
      const seats = createSeats(COACH_SIZE);
      const newCoach = new Coach({ seats });
      await newCoach.save();
      return res.status(200).json({ ok: true, coach: newCoach });
    }
    return res.status(200).json({ ok: true, coach });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Try again" });
  }
};

exports.reserveSeats = async function (req, res) {
  try {
    let { numberOfSeats } = req.body;

    if (numberOfSeats === undefined) {
      return res
        .status(400)
        .json({ ok: false, message: "numberOfSeats missing in the body" });
    }
    // for now there will be only one coach so taking the 1st coach
    let [coach] = await Coach.find({});

    if (coach == undefined) {
      return res.status(200).json({ ok: false, message: "Try again" });
    }

    if (numberOfSeats <= 0) {
      return res.status(200).json({
        ok: false,
        message: "Number of seats have to be more than 0",
      });
    }
    if (numberOfSeats > MAX_SEAT_IN_ONE_REVERVATION) {
      return res.status(200).json({
        ok: false,
        message: `Can't reserve more than ${MAX_SEAT_IN_ONE_REVERVATION}`,
      });
    }
    if (numberOfSeats > coach.remaining) {
      return res.status(200).json({ ok: false, message: "Not enough seats" });
    }

    let allocatedPosition = getAllocation(coach.seats, numberOfSeats);

    // updating the db record
    coach.seats.forEach((seat) => {
      if (allocatedPosition.includes(seat.number)) {
        seat.isAvailable = false;
      }
    });
    coach.remaining -= numberOfSeats;
    coach.save();

    return res.status(200).json({
      ok: true,
      allocatedPosition,
      seats: coach.seats,
    });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Try again" });
  }
};

exports.resetSeats = async function (req, res) {
  try {
    const coach = await Coach.remove();
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ok: false, message: "Try again" });
  }
};
