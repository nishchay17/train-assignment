const { Seat } = require("../model/coach");

exports.createSeats = function (number) {
  const seats = [];
  for (let i = 1; i <= number; ++i) {
    seats.push(new Seat({ number: i }));
  }
  return seats;
};
